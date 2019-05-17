
var game = {
    currentScene: "run",
    sceneIndex: 2,
    sceneOrder: [
        "run",
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
    },
    resize: function(){
        if(typeof this.getFunc().resize == "function"){
            this.getFunc().resize();
        }
    }
}
