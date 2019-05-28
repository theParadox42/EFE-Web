function playLevel(){
    let lvl = playLevel.level;
    switch(lvl.type){
        case "run":
            runToRocket();
        break;
        case "build":
            buildRocket();
        break;
    }
}
playLevel.init = function(){
    let lvl = playLevel.level;
    switch(lvl.type){
        case "run":
            loadRun.init();
        break;
        case "build":
            bGame.init();
        break;
    }

}
playLevel.level = {};
playLevel.gobackto = "communitylevels";
playLevel.setup = function(level, gobackto){
    playLevel.level = level;
    let lvl = playLevel.level;
    switch(lvl.type){
        case "run":
            loadRun.current = lvl;
            loadRun.gobackto = gobackto;
        break;
        case "build":
            bGame.map = lvl.level;
            bGame.gobackto = gobackto;
        break;
    }
}
