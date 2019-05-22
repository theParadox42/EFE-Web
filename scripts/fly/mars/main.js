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
        ufos[i].run(flyPlayer);
        if(ufos[i].dead&&ufos[i].frame>20){
            ufos.splice(i, 1);
        }
    }
    flyPlayer.run();
    for(var i in asteroids){
        asteroids[i].run(flyPlayer);
        if(asteroids[i].dead&&asteroids[i].frame>20){
            asteroids.splice(i, 1);
        }
    }
    pop();
    flyPlayer.displayHealth();
}
flyToMars.level = {
    asteroids: [[1200, 300, 100]], //x, y, size
    ufos: [[1000, 300]] //x, y
}
flyToMars.init = function(){
    flyPlayer = new FlyPlayer(50, height/2);
    flyPlayer.init();
    loadLevel(this.level);
}
