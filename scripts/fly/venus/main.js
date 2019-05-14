function flyToVenus(){
    background(0,0,0);
    drawStars();
    flyPlayer.run();
    for(var i in asteroids){
        asteroids[i].run(player);
    }
}
flyToVenus.init = function(){
    createStars();
    flyPlayer.init();
}
