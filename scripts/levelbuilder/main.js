var levelsBuilt = JSON.parse(localStorage.myLevels || "[]");
var currentBuildingLevel = {};
function levelBuilder(){
    levelBuilder.getFunc()();
}
levelBuilder.getFunc = function(){
    switch(levelBuilder.building){
        case "run":
            return buildRunMap;
        break;
        case "build":
            return buildPlatformer;
        break;
        case "space":
            return buildSpaceLevel;
        break;
        case "mars":
            return buildArena;
        break;
        case "new":
            return createNewLevel;
        break;
        case "none":
            return levelBuilderMenu;
        break;
        default:
            levelBuilder.building = "none";
            return levelBuilderMenu;
        break;
    }
}
levelBuilder.setType = function(type){
    levelBuilder.building = type;
    if(typeof this.getFunc().init == "function") this.getFunc().init();
}
levelBuilder.save = function(){
    localStorage.myLevels = JSON.stringify(levelsBuilt || "[]");
}
levelBuilder.init = function(){
    levelBuilder.building = "none";
    levelBuilderMenu.init();
}
levelBuilder.createNew = function(){
    levelBuilder.building = "new";
}
