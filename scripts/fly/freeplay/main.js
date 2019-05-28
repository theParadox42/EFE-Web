function FlyFreeplay(){
    push();
    background(0, 0, 0);
    if(flyPlayer.x>width/2&&flyPlayer.x<FlyFreeplay.level.w){
        translate(-flyPlayer.x+width/2, 0);
    }else if(flyPlayer.x>5500){
        translate(-5500+width/2, 0);
    }
    if(flyPlayer.x>5500+width/2){
        game.setScene(FlyFreeplay.gobackto)();
    }
    displayStars();
    for(var i in flySigns){
        flySigns[i].display(flyPlayer);
    }
    for(var i in lasers){
      lasers[i].run();
      if(lasers[i].dead){
          lasers.splice(i, 1);
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
FlyFreeplay.set = function(level, gobackto){
    this.level = level;
    this.gobackto = gobackto;
}
FlyFreeplay.init = function(){
    flyPlayer = new FlyPlayer(50, height/2);
    flyPlayer.init();
    this.level.w = this.level.width / 100 * height
    loadDynamicLevel(this.level);
}
