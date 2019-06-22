
function runToRocket(){

    background(200, 225, 255);

    for(var i = 0; i < runScenery.length; i ++){
        runScenery[i].run(runPlayer);
    }
    fill(255, 255, 255, 60);
    rect(0,0,width,height);

    push();
    translate(runPlayer.transX, 0);

    for(var i = 0; i < runSigns.length; i ++){
        runSigns[i].display(runPlayer);
    }
    runPlayer.run();
    runGround.display();
    for(var i = 0; i < runObstacles.length; i ++){
        runObstacles[i].run(runPlayer);
    }
    // console.log(runObstacles.length);
    pop();
};

runToRocket.init = function(){
    loadRun.init();
};
runToRocket.reload = function(){
    loadRun.reload();
};
runToRocket.reset = function(){
    loadRun.reset();
}
