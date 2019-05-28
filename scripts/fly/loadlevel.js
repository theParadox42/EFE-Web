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

// All this does is it doesn't use the height in the data, instead it takes in a percent
function loadDynamicLevel(level){
    flySigns = [];
    asteroids = [];
    for(var i in level.asteroids){
        let a = level.asteroids[i];
        asteroids.push(new Asteroid(a[0], a[1]/100*height, a[2]));
    }
}
