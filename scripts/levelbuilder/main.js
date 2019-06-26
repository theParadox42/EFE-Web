var levelsBuilt = JSON.parse(localStorage.myLevels || "[]");

function levelBuilder(){
    if(levelBuilder.building=="none"){
        levelBuilderMenu();
    } else {
        switch(levelBuilder.building){
            case "run":
                buildRunMap();
            break;
            case "build":
                buildPlatformer();
            break;
            case "space":
                buildSpaceLevel();
            break;
            case "mars":
                buildArena();
            break;
            case "new":
                createNewLevel();
            break;
            default:
                levelBuilder.building = "none";
            break;
        }
    }
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
