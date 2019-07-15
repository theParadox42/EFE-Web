
var game = {
     /** Keep this this **/
    currentScene: "load", // Current scene, should stay on "load"
    previousScene: "home",
    sceneIndex: 0, // Scene index, should start on 0
    sceneOrder: [
        "load",
        "home",
        "wakeup",
        "run",
        "launchpad",
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
        "launchpad": true,
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
        "wakeup": true,
        "run": true,
        "launchpad": true,
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
        "playlevel": true
    },
    paused: false,
    loadFirstOnPlay: false,
    continue: function(){
        this.previousScene = this.currentScene;
        if(this.sceneOrder[this.sceneIndex+1]){
            if(typeof this.getFunc().reset == "function") this.getFunc().reset();
            this.sceneIndex ++;
            this.currentScene = this.sceneOrder[this.sceneIndex];
            if(typeof this.getFunc().init == "function") this.getFunc().init();
        } else console.log("End of scenes");
    },
    setScene: function(newScene, error){
        if(!error) {
            this.previousScene = this.currentScene;
            if(typeof this.getFunc().reset == "function") this.getFunc().reset();
        }
        if(typeof newScene == "number"){
            this.currentScene = this.sceneOrder[newScene];
        } else if(typeof newScene == "string") {
            this.currentScene = newScene;
        }
        if(typeof this.getFunc().init == "function") this.getFunc().init();
        if(typeof newScene == "number"){
            this.sceneIndex = newScene;
        } else {
            var newIndex = this.sceneOrder.findIndex(function(a){
                return a == game.currentScene;
            })
            this.sceneIndex = newIndex >= 1 ? newIndex : 0;
        }
    },
    getFunc: function(){
        let sceneFunctions = {
            "load": loadFiles,
            "home": Home,
            "choose": ChooseUseSave,
            "wakeup": wakeUpScene,
            "run": runToRocket,
            "launchpad": AtLaunchPad,
            "build": buildRocket,
            "fly-moon": flyToMoon,
            "moon": moon,
            "fly-mars": flyToMars,
            "fight": fightMartians,
            "fly-venus": flyToVenus,
            "ufo": ufoBossFight,
            "won": Won,
            "loadsaves": LoadSaves,
            "levelbuilder": levelBuilder,
            "communitylevels": communityLevels,
            "playlevel": playLevel
        }
        if(sceneFunctions[this.currentScene]){
            return sceneFunctions[this.currentScene];
        } else {
            console.warn("Unknown scene: " + this.currentScene);
            this.setScene("home", true);
            return this.getFunc();
        }
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
        ellipse(width/2, height/2 - this.minSide * 0.3, this.minSide*1.1, this.minSide*1.1);
        rectMode(CENTER);
        stroke(0);
        strokeWeight(5);
        rect(width/2, height/2+this.minSide*0.5, width/2, this.minSide*0.2)
        if(this.canSave[this.currentScene]){
            rect(width/2, height/2 + this.minSide * 0.8, width/2, this.minSide*0.2);
        }
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0);
        textFont(fonts.londrina);
        textSize(this.minSide*0.15);
        text(this.currentScene == "playlevel" ? "Back" : "Home", width/2, height/2+this.minSide*0.5);

        if(this.canSave[this.currentScene]){
            text("Save", width/2, height/2+this.minSide*0.8);
            textSize(this.minSide*0.05);
            fill(255);
            text("Going home also saves your progress", width/2, height-this.minSide*0.05);
        }

        imageMode(CENTER);
        image(imgs.playbtn, width/2, height/2 - this.minSide * 0.3, this.minSide, this.minSide);
        pop();
        if(!isMobile){
            this.pausedImage = get();
        }
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
            if(dist(mouseX, mouseY, width/2, height/2 - this.minSide * 0.3) < this.minSide*0.55){
                cursor(HAND);
                if(clicked){
                    this.paused = false;
                }
            } else if(mouseX>width/4&&mouseX<width*3/4&&mouseY>height/2+this.minSide*0.4&&mouseY<height/2+this.minSide*0.6){
                cursor(HAND);
                if(clicked){
                    if(this.currentScene!="playlevel")this.saveCurrentProgress();
                    this.setScene(this.currentScene=="playlevel"?this.previousScene:"home");
                }
            } else if(this.canSave[this.currentScene] && mouseX>width/4&&mouseX<width*3/4&&mouseY>height/2+this.minSide*0.7&&mouseY<height/2+this.minSide*0.9) {
                cursor(HAND);
                if(clicked){
                    this.saveProgress();
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
    saveCurrentProgress: function(){
        if(!this.canSave[this.currentScene]) return;
        var progress = this.saveProgress(null, true);
        localStorage.currentSave = JSON.stringify(progress);
    },
    saveProgress: function(scene, returnObj){

        if(!this.canSave[this.currentScene]) return console.log("Not a valid scene to save from");
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
        var currentDate = new Date();
        saveObject.date = {
            year: currentDate.getYear(),
            month: currentDate.getMonth(),
            day: currentDate.getDate(),
            hour: currentDate.getHours(),
            minute: currentDate.getMinutes()
        };
        if(typeof data != "undefined") saveObject.data = data;
        if(returnObj) return saveObject;
        var saves = JSON.parse(localStorage.saves || "[]");
        saves.unshift(saveObject);
        localStorage.saves = JSON.stringify(saves);
    },
    retrieveCurrentProgress: function(){
        if(!localStorage.currentSave) return console.log("No saves found");
        var savedObject;
        try {
            savedObject = JSON.parse(localStorage.currentSave);
        } catch(e){
            return console.warn("Unparsable data type")
        }
        if(typeof savedObject != "object") return console.warn("Not an object");
        return savedObject;
    },
    retrieveProgress: function(i, arr){
        i = i || 0;
        if(!localStorage.saves) return console.log("No saves found");
        var savedData;
        try {
            savedData = JSON.parse(localStorage.saves);
        } catch(e){
            return console.warn("Unparsable data type")
        }
        if(typeof savedData != "object" || !savedData.length) return console.warn("Not an array");
        if(arr) return savedData;
        var savedObject = savedData[i];
        if(typeof savedObject != "object") return console.warn("Not an object");
        return savedObject;
    },
    loadProgress: function(obj){
        var savedObject = obj ? obj : this.retrieveCurrentProgress();

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
