function runToRocket(){
    background(200, 225, 255);

    push();
    translate(runPlayer.transX, 0);

    runPlayer.run();
    runGround.display();
    for(var i in obstacles){
        obstacles[i].run(runPlayer);
    }
    pop();
};

runToRocket.init = function(){
    runGround.init();
    runPlayer.init();
    createObstacles();
    for(var i in obstacles){
        obstacles[i].init();
    }
};
runToRocket.reload = function(){

};
runToRocket.resize = function(){
    runGround.init();
}
