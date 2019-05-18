function moon(){
    for(var i = 0; i < width; i += height){
        image(imgs.stars, i, 0, height, height)
    }
    manOnTheMoon.run();
    image(imgs.moon, 0, 0, width, height);
    moonShip.run();
    moonPlayer.run();
}
moon.init = function(){
    manOnTheMoon.init();
    moonShip.init();
    moonPlayer.init();
}
