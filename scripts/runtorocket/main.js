function runToRocket(){
    background(200, 225, 255);
    runPlayer.run();
};

runToRocket.init = function(){
    console.log("inited")
    runPlayer.init();
};
