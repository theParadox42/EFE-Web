
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
        } else {
            console.log("End of scenes");
        }
    },
    run: function(){
        switch(this.currentScene){
            case "run":
                runToRocket();
            break;
            case "build":
                buildRocket();
            break;
            case "fly-mars":
                flyToMars();
            break;
            case "fight":
                fightMartians();
            break;
            case "fly-venus":
                flytoVenus();
            break;
        }
    }
}
