function Asteroid(x, y, r){
    this.x = x;
    this.y = y;
    this.radius = r;
    this.health = 3;
    this.dead = false;
}
Asteroid.prototype.run = function(p){
    this.display();
    this.collide(p);
    if(this.health < 1){
        this.dead = true; //we need an explosion animation
    }
}
Asteroid.prototype.collide = function(p){
    let distance = dist(this.x, this.y, p.x, p.y)
    let r = this.radius + (p.w + p.h) / 4;
    if (distance < r) {
        console.log("collision");
    }
    for(var i in lasers){
        let l = lasers[i];
        distance = dist(this.x, this.y, l.x, l.y);
        r = l.radius + this.radius;
        if (distance < r) {
            l.dead = true;
            this.health --;
        }
    }
}
Asteroid.prototype.display = function(){
    push();
    imageMode(CENTER);
    image(imgs.asteroid, this.x, this.y, this.radius*2, this.radius*2);
    pop();
}
let asteroids = [];
