function runToRocket(){
    background(200, 225, 255);

    push();
    translate(runPlayer.transX, 0);

    runPlayer.run();
    runGround.display();
    pop();
};

runToRocket.init = function(){
    runGround.init();
    runPlayer.init();
};
runToRocket.reload = function(){

};
runToRocket.resize = function(){
    runGround.init();
}
