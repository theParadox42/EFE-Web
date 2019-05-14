function runToRocket(){
    background(200, 225, 255);
    runPlayer.run();
    runGround.display();
};

runToRocket.init = function(){
    runPlayer.init();
    runGround.init();
};
runToRocket.reload = function(){

};
