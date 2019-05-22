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
