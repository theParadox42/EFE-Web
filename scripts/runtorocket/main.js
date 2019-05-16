
function runToRocket(){
    background(200, 225, 255);

    push();
    translate(runPlayer.transX, 0);

    for(var i = 0; i < signs.length; i ++){
        signs[i].display(runPlayer);
    }
    runPlayer.run();
    runGround.display();
    for(var i = 0; i < obstacles.length; i ++){
        obstacles[i].run(runPlayer);
    }
    pop();
};

runToRocket.init = function(){
    runGround.init();
    runPlayer.init();
    loadRun.init();
    loadRun.load();
};
runToRocket.reload = function(){
    loadRun.reload();
};
runToRocket.resize = function(){
    runGround.init();
};
