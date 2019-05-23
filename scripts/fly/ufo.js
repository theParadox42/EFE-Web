function Ufo(x, y){
    this.x = x;
    this.y = y;
    this.health = 2;
    this.frame = 0;
    this.radius = 1920*0.06;
    this.speed = 5;
}
Ufo.prototype.run = function(p){
    this.display();
    if(!this.dead){
        this.collide(p);
        if(dist(this.x, this.y, p.x, p.y)<1000) this.update(p);
    }
    if(this.health<1){
        this.dead = true;
    }
}
Ufo.prototype.update = function(p){
    if(this.x<p.x) this.x += this.speed;
    if(this.x>p.x) this.x -= this.speed;
    if(this.y<p.y) this.y += this.speed;
    if(this.y>p.y) this.y -= this.speed;
}
Ufo.prototype.collide = function(p){
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
Ufo.prototype.display = function(){
    this.img = imgs.ufo.clone();
    push();
    translate(this.x, this.y);
    scale(0.10)
    if(this.dead){
        this.img = imgs.explosion[round(this.frame/2)]; //image only switches every other frame
        this.frame ++;
        image(this.img, -imgs.explosion[0].width/2, -imgs.explosion[1].height/2);
    } else{
        drawAnimation(this.img, 0, 0);
    }
    pop();
}
let ufos = [];
