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
playLevel.setup = function(level){
    playLevel.level = level;
    let lvl = playLevel.level;
    switch(lvl.type){
        case "run":
            loadRun.current = lvl;
            console.log(loadRun.current);
        break;
    }
}
