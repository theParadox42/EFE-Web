
var game = {
    currentScene: "run",
    sceneIndex: 0,
    sceneOrder: [
        "run",
        "build",
        "fly-mars",
        "fight",
        "fly-venus"
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
            case "fly-mars":
                returnFunc = flyToMars;
            break;
            case "fight":
                returnFunc = fightMartians;
            break;
            case "fly-venus":
                returnFunc = flytoVenus;
            break;
        }
        return returnFunc;
    },
    run: function(){
        this.getFunc()();
    },
    init: function(){
        if(this.getFunc().init){
            this.getFunc().init();
        }
    }
}