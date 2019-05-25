function levelBuilder(){
    if(levelBuilder.building=="none"){

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
            default:
                levelBuilder.building = "none";
            break;
        }
    }
}
levelBuilder.init = function(){
    levelBuilder.building = "none";
}
