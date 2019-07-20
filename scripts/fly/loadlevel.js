var bosses = [];
function loadLevel(level){
    flySigns = [];
    asteroids = [];
    bosses = [];
    for(var i in level.boss){
        bosses.push(new UfoBoss(level.boss[i][0], level.boss[i][1]));
    }
    for(var i in level.asteroids){
        let a = level.asteroids[i];
        asteroids.push(new Asteroid(a[0], a[1], a[2]));
    }
    ufos = [];
    for(var i in level.ufos){
        let u  = level.ufos[i];
        ufos.push(new Ufo(u[0], u[1]*height/100));
    }
}

// Takes in an x as a percent, which is multiplied by the height
// All this does is it doesn't use the height in the data, instead it takes in a percent of the height
// It also takes in a percent for the radius, which 100% is height/2
function loadDynamicLevel(level){
    flySigns = [];
    asteroids = [];
    ufos = [];
    bosses = [];
    if(level.asteroids){
        for(var i = 0; i < level.asteroids.length; i ++){
            let a = level.asteroids[i];
            for(var j = 0; j < a.length; j ++){
                if(typeof a[j] == "string"){
                    a[j] = parseFloat(a[j]);
                }
            }
            asteroids.push(new Asteroid(a[0]/100*height, a[1]/100*height, a[2]/200*height));
        }
    }
    if(level.ufos){
        for(var i = 0; i < level.ufos.length; i ++){
            let u = level.ufos[i];
            for(var j = 0; j < u.length; j ++){
                if(typeof u[j] == "string"){
                    u[j] = parseFloat(u[j]);
                }
            }
            ufos.push(new Ufo(u[0]/100*height, u[1]/100*height, u[2]/200*height))
        }
    }
    if(level.boss){
        for(var i = 0; i < level.boss.length; i ++){
            var b = level.boss[i];
            for(var j = 0; j < b.length; j ++){
                if(typeof b[j] == "string"){
                    b[j] = parseFloat(b[j]);
                }
            }
            bosses.push(new UfoBoss(b[0]/100*height, b[1]/100*height, b[2]/200*height));
        }
    }
}
