function loadLevel(level){
    flySigns = [];
    asteroids = [];
    for(var i in level.asteroids){
        let a = level.asteroids[i];
        asteroids.push(new Asteroid(a[0], a[1], a[2]));
    }
    ufos = [];
    for(var i in level.ufos){
        let u  = level.ufos[i];
        ufos.push(new Ufo(u[0], u[1]));
    }
}

// Takes in an x as a percent, which is multiplied by the height
// All this does is it doesn't use the height in the data, instead it takes in a percent of the height
// It also takes in a percent for the radius, which 100% is height/2
function loadDynamicLevel(level){
    flySigns = [];
    asteroids = [];
    ufos = [];
    for(var i in level.asteroids){
        let a = level.asteroids[i];
        asteroids.push(new Asteroid(a[0]/100*height, a[1]/100*height, a[2]/200*height));
    }
    for(var i in level.ufos){
        let u = level.ufos[i];
        ufos.push(new Ufo(u[0]/100*height, u[1]/100*height))
    }
}
