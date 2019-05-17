function flyToVenus(){
    background(0,0,0);
    push();
    if(flyPlayer.x>width/2){
        translate(-flyPlayer.x+width/2, 0);
    }
    displayStars();
    for(var i in lasers){
      lasers[i].run();
      if(lasers[i].dead){
          lasers.splice(i, 1);
      }
    }
    flyPlayer.run();
    for(var i in asteroids){
        asteroids[i].run(flyPlayer);
        if(asteroids[i].dead){
            asteroids.splice(i, 1);
        }
    }
    pop();
}
flyToVenus.init = function(){
    flyPlayer.init();
    asteroids.push(new Asteroid(400, 400, 100))
}
