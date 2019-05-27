function playLevel(){
    let lvl = playLevel.level;
    switch(lvl.type){
        case "run":
            runToRocket();
        break;
    }
}
playLevel.init = function(){
    let lvl = playLevel.level;
    switch(lvl.type){
        case "run":
            loadRun.init();
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
            console.log(loadRun.current);
        break;
    }
}
