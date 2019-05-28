
var game = {
     /** Keep this this **/
    currentScene: "load",
    sceneIndex: 0,
    // Slash out all the scenes until the one you are working on EXCEPT for "load"
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
        // Other scenes will probably include, "levelbuilder", "leveltester"
    ],
    hasPause: {
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
            this.sceneIndex ++;
            this.currentScene = this.sceneOrder[this.sceneIndex];
            if(typeof this.getFunc().init == "function"){
                this.getFunc().init();
            }
        } else {
            console.log("End of scenes");
        }
    },
    setScene: function(newScene){
        this.currentScene = newScene;
        if(typeof this.getFunc().init == "function"){
            this.getFunc().init();
        }
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
                currentScene = "home";
                returnFunc = function(){}
            break;
        }
        return returnFunc;
    },
    pause: function(){
        push();
        this.paused = true;
        fill(0, 0, 0, 100);
        noStroke();
        rect(0, 0, width, height);
        imageMode(CENTER);
        var minSide = min(width, height)-100
        noStroke();
        fill(255);
        ellipse(width/2, height/2, minSide+50, minSide+50);
        image(imgs.playbtn, width/2, height/2, minSide, minSide);
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
            if(clicked){
                clicked = false;
                this.paused = false;
            } else if(pressed){
                pressed = false;
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
