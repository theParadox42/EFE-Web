function flyToVenus(){
    background(0,0,0);
    push();
    if(flyPlayer.x>width/2){
        if(flyPlayer.x < 4000){
            translate(-flyPlayer.x+width/2, 0);
        } else if(flyPlayer.x > 4000 + width/2){
            game.continue();
        } else {
            translate(-4000 + width/2, 0);
        }
    }
    displayStars();
    // planets
    image(imgs.mars, -height/5, -height/12, height/3, height/3);
    image(imgs.venus, 4000+width/2-height/6, height*3/4, height/5, height/5);
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
flyToVenus.init = function(){
    flyPlayer = new FlyPlayer(50, height/2);
    flyPlayer.init();
    this.level = {
        asteroids: [[1200, height/2, height/2], [3000, height/2, 100], [3000, height/2-200, 100], [3000, height-200, 100]],
        ufos: [[1600, height/2], [2000, 100], [2400, height-100], [2800, height/2], [3500, height/2], [3500, height]],
    }
    loadLevel(this.level);
}
