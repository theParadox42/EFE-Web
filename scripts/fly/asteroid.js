function Asteroid(x, y, r){
    this.x = x;
    this.y = y;
    this.radius = r;
}
Asteroid.prototype.run = function(p){
    this.display();
    this.collide(p);
}
Asteroid.prototype.collide = function(p){
    //I definitely didn't find this on w3schools
    //the problem with this is it is only looking at the dead center of the rocket. I'm not good enough at math to figure out how to make it look at all the rocket
    // Well, it is possible, but it is freaking hard, and we will just deal with circle collisions
    let distance = dist(this.x, this.y, p.x, p.y)
    let r = this.radius + (p.w + p.h) / 4;
    if (distance < r) {
        console.log("collision");
    }
}
Asteroid.prototype.display = function(){
    push();
    imageMode(CENTER);
    image(imgs.asteroid, this.x, this.y, this.radius*2, this.radius*2);
    pop();
}
let asteroids = [];
asteroids.push(new Asteroid(400, 400, 100))
