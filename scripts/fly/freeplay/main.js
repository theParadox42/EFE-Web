function FlyFreeplay(){
    push();
    background(0, 0, 0);
    FlyFreeplay.transX = 0;
    var levelW = FlyFreeplay.level.w;
    var cameraView = width/2;
    if(flyPlayer.x>cameraView&&flyPlayer.x<levelW){
        FlyFreeplay.transX = -flyPlayer.x+cameraView;
    }else if(flyPlayer.x>levelW){
        FlyFreeplay.transX = -levelW+cameraView
    }
    if(flyPlayer.x>levelW+cameraView){
        game.setScene(FlyFreeplay.gobackto);
        if(FlyFreeplay.levelObject.levelBuilderLevel){
            FlyFreeplay.levelObject.verified = true;
            levelBuilder.save();
        }
    }
    translate(FlyFreeplay.transX, 0);
    displayStars();

    for(var i = lasers.length - 1; i > -1; i --) {
      lasers[i].run();
      if(lasers[i].dead){
          lasers.splice(i, 1);
      }
    }
    for(var i = ufos.length - 1; i > -1; i --) {
        ufos[i].run(flyPlayer);
        if(ufos[i].dead&&ufos[i].frame>20){
            ufos.splice(i, 1);
        }
    }
    for(var i = asteroids.length - 1; i > -1; i --) {
        asteroids[i].run(flyPlayer);
        if(asteroids[i].dead&&asteroids[i].frame>20){
            asteroids.splice(i, 1);
        }
    }
    for(var i = bosses.length - 1; i > -1; i --){
        bosses[i].run(flyPlayer);
        if(bosses[i].dead&&bosses[i].frame>20){
            bosses.splice(i, 1);
        }
    }
    flyPlayer.run();

    pop();
    flyPlayer.displayHealth();
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
