function Asteroid(x, y, r){
    this.x = x;
    this.y = y;
    this.radius = r;
    this.health = 3;
    this.dead = false;
    this.frame = 0;
}
Asteroid.prototype.run = function(p){
    this.display();
    if(!this.dead){
        this.collide(p);
    }
    if(this.health < 1){
        this.dead = true; 
    }
}
Asteroid.prototype.collide = function(p){
    let distance = dist(this.x, this.y, p.x, p.y)
    let r = this.radius + (p.w + p.h) / 4;
    if (distance < r) {
        this.dead = true;
        p.health --;
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
    if(this.dead){
        this.img = imgs.explosion[round(this.frame/2)]; //image only switches every other frame
        this.frame ++;
    } else{
        this.img = imgs.asteroid;
    }
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.radius*2, this.radius*2);
    pop();
}
let asteroids = [];
