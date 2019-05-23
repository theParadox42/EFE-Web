function Martian(x, y, w){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.kvx = 0;
    this.vy = 0;
    this.img = imgs.martian;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
    this.maxHealth = 3;
    this.health = this.maxHealth;
    this.dead = false;
}
Martian.prototype.jump = function(){
    if(this.grounded&&this.vy>=0){
        this.vy -= 15;
        this.grounded = false;
    }
}
Martian.prototype.collide = function(p) {
    let vx = abs(this.vx)+abs(p.vx), vy = abs(this.vy)+abs(p.vy);
    if(this.x+this.w-vx>p.x&&this.x+vx<p.x+p.w&&this.y+this.h-vy>p.y&&this.y+vy<p.y+p.h){
        this.jump();
        p.health --;
        if(this.x+this.w/2>p.x+p.w/2){
            p.kvx -= 10;
            this.kvs -= 5;
        } else {
            p.kvx += 10;
            this.kvs += 5;
        }
    }
};
Martian.prototype.control = function(p){
    if(this.grounded){
        if(this.x>p.x+p.w){
            this.vx-=3;
        } else if(this.x+this.w<p.x){
            this.vx+=3;
        } else {
            this.jump();
        }
        // if(abs((this.x+this.w/2)-(p.x+p.w/2))< this.w){
        //     this.jump();
        // }
    }
}
Martian.prototype.update = function(p) {
    this.control(p);
    if(!this.grounded){
        this.vy += 0.5;
    }

    this.vx *= 0.75;
    this.kvx *= 0.9;
    this.vy *= 0.99;
    this.x+=this.vx+this.kvx;
    this.y+=this.vy;

    this.grounded = false;
    
    if(this.health <= 0){
        if(~~random(2)){
            mGame.fuels.push(new MFuel(this.x+this.w/8, this.y, this.w*6/8));
        }
        this.dead = true;
    }
};
Martian.prototype.display = function() {
    push()

    translate(this.x+this.w/2, this.y);
    if(this.vx >= 0) scale(-1, 1);

    image(this.img, -this.w/2, 0, this.w, this.h);

    if(this.health != this.maxHealth){
        push();
        fill(lerpColor(color(200, 0, 0), color(0, 200, 0), this.health/this.maxHealth));
        noStroke();
        rect(-this.w/2, -50, this.health/this.maxHealth*this.w, 30);
        stroke(100);
        strokeWeight(2);
        strokeCap(SQUARE);
        noFill();
        rect(-this.w/2, -50, this.w, 30);
        pop();
    }

    pop();
};
Martian.prototype.run = function(p) {
    this.collide(p);
    this.update(p);
    this.display();
};
