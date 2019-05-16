function flyToVenus(){
    background(0,0,0);
    drawStars();
    for(var i in lasers){
      lasers[i].run();
    }
    flyPlayer.run();
    for(var i in asteroids){
        asteroids[i].run(flyPlayer);
        if(asteroids[i].dead){
            asteroids.splice(i, 1);
        }
    }
}
flyToVenus.init = function(){
    createStars();
    flyPlayer.init();
}
