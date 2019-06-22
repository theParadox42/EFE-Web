var game = {
     /** Keep this this **/
    currentScene: "load", // Current scene, should stay on "load"
    sceneIndex: 0, // Scene index, should start on 0
    sceneOrder: [
        "load",
        // "communitylevels",
        "home",
        "run",
        "build",
        "fly-moon",
        "moon",
        "fly-mars",
        "fight",
        "fly-venus",
        "ufo",
        "won"
        // Other scenes not in the scene order include "communitylevels" and "playlevel"
    ],
    canSave: {
        "run": true,
        "build": true,
        "fly-moon": true,
        "moon": true,
        "fly-mars": true,
        "fight": true,
        "fly-venus": true,
        "ufo": true
    },
    hasPause: {
        // What scenes need a pause button
        "run": true,
        "build": true,
        "fly-moon": true,
        "moon": true,
        "fly-mars": true,
        "fight": true,
        "fly-venus": true,
        "ufo": true,
        "playlevel": true
    },
    reqControls: {
        // What scenes require key controls
        "run": true,
        "build": true,
        "fly-moon": true,
        "fly-mars": true,
        "fight": true,
        "fly-venus": true,
        "ufo": true,
    },
    paused: false,
    continue: function(){
        if(this.sceneOrder[this.sceneIndex+1]){
            if(typeof this.getFunc().reset == "function") this.getFunc().reset();
            this.sceneIndex ++;
            this.currentScene = this.sceneOrder[this.sceneIndex];
            if(typeof this.getFunc().init == "function") this.getFunc().init();
        } else console.log("End of scenes");
    },
    setScene: function(newScene){
        this.currentScene = newScene;
        if(typeof this.getFunc().init == "function"){
            this.getFunc().init();
        }
        var newIndex = this.sceneOrder.findIndex(function(a){
            return a == this.currentScene;
        })
        this.sceneIndex = newIndex >= 1 ? newIndex : 1;
    },
    getFunc: function(){
        var returnFunc;
        switch(this.currentScene){
            case "load":
                returnFunc = loadFiles;
            break;
            case "home":
                returnFunc = Home;
            break;
            case "run":
                returnFunc = runToRocket;
            break;
            case "build":
                returnFunc = buildRocket;
            break;
            case "fly-moon":
                returnFunc = flyToMoon;
            break;
            case "moon":
                returnFunc = moon;
            break;
            case "fly-mars":
                returnFunc = flyToMars;
            break;
            case "fight":
                returnFunc = fightMartians;
            break;
            case "fly-venus":
                returnFunc = flyToVenus;
            break;
            case "ufo":
                returnFunc = ufoBossFight;
            break;
            case "won":
                returnFunc = Won;
            break;
            case "levelbuilder":
                returnFunc = levelBuilder;
            break;
            case "communitylevels":
                returnFunc = communityLevels;
            break;
            case "playlevel":
                returnFunc = playLevel;
            break;
            default:
                this.currentScene = "home";
                returnFunc = function(){}
                console.log("Unknown scene, switching to home...");
            break;
        }
        return returnFunc;
    },
    pause: function(){
        push();
        this.paused = true;
        fill(0, 0, 0, 180);
        noStroke();
        rect(0, 0, width, height);
        this.minSide = this.minSide || min(min(width, height), imgs.playbtn.width * 2) / 2;
        noStroke();
        fill(255);
        ellipse(width/2, height/2, this.minSide*1.1, this.minSide*1.1);
        rectMode(CENTER);
        stroke(0);
        strokeWeight(5);
        rect(width/2, height/2+this.minSide*0.7, width/2, this.minSide*0.2)
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0);
        textFont(fonts.londrina);
        textSize(this.minSide*0.15);
        text("Home", width/2, height/2+this.minSide*0.7);
        imageMode(CENTER);
        image(imgs.playbtn, width/2, height/2, this.minSide, this.minSide);
        pop();
        this.pausedImage = get();
    },
    displayPaused: function(){
        if(this.paused&&this.pausedImage){
            image(this.pausedImage, 0, 0, width, height);
        } else if(!this.paused){
            push();
            fill(255);
            noStroke();
            ellipse(25, 25, 45, 45);
            image(imgs.pausebtn, 5, 5, 40, 40);
            pop();
        } else {
            console.log("Paused image not loaded...");
        }
    },
    updatePaused: function(){
        if(this.paused){
            if(dist(mouseX, mouseY, width/2, height/2)<this.minSide*0.55){
                cursor(HAND);
                if(clicked){
                    this.paused = false;
                }
            } else if(mouseX>width/4&&mouseX<width*3/4&&mouseY>height/2+this.minSide*0.6&&mouseY<height/2+this.minSide*0.8){
                cursor(HAND);
                if(clicked){
                    this.setScene("home");
                }
            }
        } else {
            if(mouseX<50 && mouseY<50){
                cursor(HAND);
                if(clicked){
                    this.pause();
                    clicked = false;
                } else if(pressed){
                    pressed = false;
                }
            }
        }
    },
    alreadyLoaded: false,
    saveProgress: function(scene){
        if(!this.hasPause[this.currentScene]) return console.log("Not a valid scene to save from");
        var saveObject = {};
        saveObject.scene = scene || this.currentScene;
        var data = 0;
        switch(saveObject.scene){
            case "run":
                data = loadRun.level;
            break;
            case "build":
                data = bGame.level;
            break;
        }
        var saves = JSON.parse(localStorage.saves);
        saves.unshift(saveObject);
        localStorage.saves = JSON.stringify(saves);
    },
    loadProgress: function(i){
        i = i || 0;
        if(!localStorage.saves) return console.log("No saves found");
        var savedData;
        try {
            savedData = JSON.parse(localStorage.saves);
        } catch(e){
            return console.warn("Unparsable data type")
        }
        if(typeof savedData != "object" || !savedData.length) return console.warn("Not an array");
        var savedObject = savedData[i];
        if(typeof savedObject != "object") return console.warn("Not an object");
        if(savedObject.data){
            switch(savedObject.scene){
                case "run":
                    loadRun.level = savedObject.data;
                break;
                case "build":
                    bGame.level = savedObject.data;
                break;
            }
        }
        this.setScene(savedObject.scene);
    },
    run: function(){

        // Pause stuff
        if(this.hasPause[this.currentScene]){
            // Update pause status
            this.updatePaused();
            if(this.paused){
                // Display stuff
                this.displayPaused();
                // Reset if paused
                resetInput();
                return;
            }
        } else this.paused = false;

        // Mobile here
        if(isMobile && this.reqControls[this.currentScene]) updateMobile();

        // Main program
        this.getFunc()();

        // And here
        if(isMobile && this.reqControls[this.currentScene]) displayMobile();

        // Reset controls
        resetInput();

        // Display pause Button
        if(this.hasPause[this.currentScene]) this.displayPaused();
    },
    init: function(){
        let currentIndex = this.sceneOrder.indexOf(function(a){
            return a == this.currentScene;
        })
        this.sceneIndex = currentIndex >= 0 ? currentIndex : this.sceneIndex;
        if(isMobile){
            createMobileControls();
        }
        if(typeof (this.getFunc().init) == "function"){
            this.getFunc().init();
        }
    },
    resize: function(){
        if(typeof this.getFunc().resize == "function"){
            this.getFunc().resize();
        }
    }
}
