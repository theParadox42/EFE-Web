function Ufo(x, y, r){
    this.x = x;
    this.y = y;
    this.radius = r || 100;
    this.img = imgs.ufo.clone();
    this.w = this.radius * 2;
    this.h = this.w * this.img.height / this.img.width;
    this.radius = (this.w+this.h) / 4
    this.speed = 5;
    this.health = 2;
    this.frame = 0;
}
Ufo.prototype.run = function(p){
    this.display();
    if(!this.dead){
        if(p) {
            this.collide(p);
            if(dist(this.x, this.y, p.x, p.y)<1000) this.update(p);
        }
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
    push();
    translate(this.x, this.y);
    if(this.dead){
        let explosionImg = imgs.explosion[round(this.frame/2)]; //image only switches every other frame
        this.frame ++;
        imageMode(CENTER);
        image(explosionImg, 0, 0, this.radius*2, this.radius*2);
    } else{
        drawAnimation(this.img, 0, 0, this.w, this.h);
    }
    pop();
}
let ufos = [];
