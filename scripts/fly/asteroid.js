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
    let distance = (p.x - this.x) * (p.x - this.x) + (p.y - this.y) * (p.y - this.y)
    let r = this.radius*this.radius;
    if (distance < r) {
        console.log("collision");
    }
}
Asteroid.prototype.display = function(){
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(imgs.asteroid, 0, 0, this.radius*2, this.radius*2);
    pop();
}
let asteroids = [];
asteroids.push(new Asteroid(400, 400, 100))