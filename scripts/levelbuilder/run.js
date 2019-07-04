function buildRunMap(){
    background(200, 225, 250);

    if(typeof currentBuildingLevel != "object") return levelBuilder.setType("none");



}
var buildRunObjs = null;

buildRunMap.update = function(){
    buildRunObjs = {};
    var runmap = currentBuildingLevel.map;
    for(var i = 0; i < runmap.length; i ++){
        switch(runmap[i]){
            case "x":
                buildRunObjs.push(new RunTrash(i * runObstacleWidth));
            case "c":
                buildRunObjs.push(new RunCar(i * runObstacleWidth))
            break;
            case "^":
                buildRunObjs.push(new RunSpike(i * runObstacleWidth))
            break;
            // case "l":
        }

    }
}
buildRunMap.init = function(){
    this.update();
};
