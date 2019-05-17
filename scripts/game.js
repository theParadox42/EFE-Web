
var game = {
    currentScene: "load",
    sceneIndex: 0,
    sceneOrder: [
        "load",
        "run", // Tanner just change this from now on, the loading was causing problems because there was so many things
        "build",
        "fly-moon",
        "moon",
        "fly-mars",
        "fight",
        "fly-venus",
        "ufo"
    ],
    continue: function(){
        if(this.sceneOrder[this.sceneIndex+1]){
            this.sceneIndex ++;
            this.currentScene = this.sceneOrder[this.sceneIndex];
            this.getFunc().init();
        } else {
            console.log("End of scenes");
        }
    },
    getFunc: function(){
        var returnFunc;
        switch(this.currentScene){
            case "load":
                returnFunc = loadFiles;
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
            default:
                currentScene = "run";
                returnFunc = function(){}
            break;
        }
        return returnFunc;
    },
    run: function(){
        this.getFunc()();
    },
    init: function(){
        if(typeof this.getFunc().init == "function"){
            this.getFunc().init();
        }
        this.sceneIndex = this.sceneOrder.indexOf(function(a){
            return a == this.currentScene;
        })
    },
    resize: function(){
        if(typeof this.getFunc().resize == "function"){
            this.getFunc().resize();
        }
    }
}
