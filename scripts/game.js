
var game = {
     /** Keep this this **/
    currentScene: "load",
    sceneIndex: 0,
    // Slash out all the scenes until the one you are working on EXCEPT for "load"
    sceneOrder: [
        "load",
        "won",
        "home",
        "run",
        "build",
        "fly-moon",
        "moon",
        "fly-mars",
        "fight",
        "fly-venus",
        "ufo",
        // Other scenes will probably include, "levelbuilder", "leveltester"
    ],
    reqControls: {
        "run": true,
        "build": true,
        "fly-moon": true,
        "fly-mars": true,
        "fight": true,
        "fly-venus": true,
        "ufo": true,
    },
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
            default:
                currentScene = "home";
                returnFunc = function(){}
            break;
        }
        return returnFunc;
    },
    run: function(){
        if(isMobile && this.reqControls[this.currentScene]){
            updateMobile();
        }
        this.getFunc()();
        resetInput();
        if(isMobile && this.reqControls[this.currentScene]){
            displayMobile();
        }
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
