function ufoBossFight(){
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
    for(var i = ufos.length-1; i>-1; i--){
        ufos[i].run(flyPlayer);
        if(ufos[i].dead&&ufos[i].frame>20){
            ufos.splice(i, 1);
        }
    }
    for(var i in bosses){
        bosses[i].run();
    }
    flyPlayer.run();
    for(var i  = asteroids.length-1; i>-1; i--){
        asteroids[i].run(flyPlayer);
        if(asteroids[i].dead&&asteroids[i].frame>20){
            asteroids.splice(i, 1);
        }
    }
    pop();
    flyPlayer.displayHealth();
}
ufoBossFight.level = {
    boss: [[2000, 50]], //x, y
}
ufoBossFight.init = function(){
    flyPlayer = new FlyPlayer(50, height/2);
    flyPlayer.init();
    loadLevel(this.level);
}
