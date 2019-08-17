let height = window.innerHeight;
function flyToMars(){
    background(0);
    push();
    if(flyPlayer.x>width/2){
        if(flyPlayer.x < 6750){
            translate(-flyPlayer.x+width/2, 0);
        } else if(flyPlayer.x > 6750 + width/2){
            game.continue();
        } else {
            translate(-6750 + width/2, 0);
        }
    }
    displayStars();
    // planets
    image(imgs.mars, 6750+width/2-height/7, height/4, height/5, height/5);
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
flyToMars.level = {
    asteroids: [[1200, height/2, 100], [1800, 150, 95], [2000, height-100, 95], [2400, height-125, 80], [2900, height/2, 125], [4500, 100, 100], [4500, height-100, 100], [4700, height/2+150, 100], [4700, height/2-150, 100]], //x, y, size
    ufos: [[1800, height/2], [3400, 200], [4000, 100], [4000, height-100], [6500, height/2], [6500, 100], [6500, height-100]] //x, y
}
flyToMars.init = function(){
    flyPlayer = new FlyPlayer(50, height/2);
    flyPlayer.init();
    loadLevel(this.level);
}
