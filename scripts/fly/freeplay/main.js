function FlyFreeplay(buildOnly){
    push();
    background(0, 0, 0);
    if(flyPlayer.x>width/2&&flyPlayer.x<FlyFreeplay.level.w){
        translate(-flyPlayer.x+width/2, 0);
    }else if(flyPlayer.x>FlyFreeplay.level.w){
        translate(-FlyFreeplay.level.w+width/2, 0);
    }
    if(flyPlayer.x>FlyFreeplay.level.w+width/2){
        game.setScene(FlyFreeplay.gobackto);
        if(FlyFreeplay.levelObject.levelBuilderLevel){
            FlyFreeplay.levelObject.verified = true;
            levelBuilder.save();
        }
    }
    displayStars();

    for(var i = ufos.length-1; i>-1; i--){
        ufos[i].run(buildOnly?null:flyPlayer);
        if(ufos[i].dead&&ufos[i].frame>20){
            ufos.splice(i, 1);
        }
    }
    for(var i in lasers){
      lasers[i].run();
      if(lasers[i].dead){
          lasers.splice(i, 1);
      }
    }
    if(!buildOnly) flyPlayer.run();
    for(var i in asteroids){
        asteroids[i].run(buildOnly?null:flyPlayer);
        if(asteroids[i].dead&&asteroids[i].frame>20){
            asteroids.splice(i, 1);
        }
    }
    pop();
    if(!buildOnly) flyPlayer.displayHealth();
}
FlyFreeplay.set = function(level, gobackto){
    this.levelObject = level;
    this.level = this.levelObject.objects;
    this.gobackto = gobackto;
}
FlyFreeplay.init = function(){
    flyPlayer = new FlyPlayer(50, height/2);
    flyPlayer.init();
    this.level.w = this.level.width / 100 * height
    loadDynamicLevel(this.level);
}
