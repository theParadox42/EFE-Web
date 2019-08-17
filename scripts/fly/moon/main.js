function flyToMoon(){
    push();
    background(0, 0, 0);
    if(flyPlayer.x>width/2&&flyPlayer.x<5500){
        translate(-flyPlayer.x+width/2, 0);
    }else if(flyPlayer.x>5500){
        translate(-5500+width/2, 0);
    }
    if(flyPlayer.x>5500+width/2){
        game.continue();
    }
    displayStars();
    // moon
    image(imgs.moonsphere, 5500+width/2-height/7, height/4, height/5, height/5);
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
flyToMoon.init = function(){
    flyPlayer = new FlyPlayer(50, height/2);
    flyPlayer.init();
    flySigns = [];
    flySigns.push(new FlySign(200, "Press space to accelerate, use the left and right arrow keys or a and d to steer")); //This is very inefficient It will be a lot more efficient when it's not a tutorial level
    asteroids = [];
    flySigns.push(new FlySign(2900, "Look out for asteroids!"));
    for(var i = -300; i<height+300; i += 300){
        asteroids.push(new Asteroid(5200, i, 150));
    }
    flySigns.push(new FlySign(4400, "Press Z to shoot, try blowing up an asteroid"));
    asteroids.push(new Asteroid(3500, height/2, 125));

}
