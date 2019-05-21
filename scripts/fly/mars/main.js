function flyToMars(){
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
    for(var i in ufos){
        ufos[i].run();
    }
    flyPlayer.run();
    for(var i in asteroids){
        asteroids[i].run(flyPlayer);
        if(asteroids[i].dead&&asteroids[i].frame>20){
            asteroids.splice(i, 1);
        }
    }
    pop();
}

flyToMars.init = function(){
    flyPlayer = new FlyPlayer(50, height/2);
    flyPlayer.init();
    flySigns = [];
    asteroids = [];
    ufos = [];
    ufos.push(new Ufo(500, height/2))
}
