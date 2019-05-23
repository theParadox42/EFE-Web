function Martian(x, y, w){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.img = imgs.martian;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
    this.maxHealth = 3;
    this.health = this.maxHealth;
}
Martian.prototype.jump = function(){
    if(this.grounded&&this.vy>=0){
        this.vy -= 15;
        this.grounded = false;
    }
}
Martian.prototype.collide = function(p) {

};
Martian.prototype.control = function(p){
    if(this.x>p.x+p.w){
        this.vx-=3;
    } else if(this.x+this.w<p.x){
        this.vx+=3;
    } else {
        this.jump();
    }
    if(abs((this.x+this.w/2)-(p.x+p.w/2))< this.w){
        this.jump();
    }

}
Martian.prototype.update = function(p) {
    this.control(p);
    if(!this.grounded){
        this.vy += 0.5;
    }

    this.vx *= 0.75;
    this.vy *= 0.99;
    this.x+=this.vx;
    this.y+=this.vy;

    this.grounded = false;
};
Martian.prototype.display = function() {
    push()

    translate(this.x+this.w/2, this.y);
    if(this.vx >= 0) scale(-1, 1);

    image(this.img, -this.w/2, 0, this.w, this.h);

    if(this.health != this.maxHealth){
        push();
        fill(lerpColor(color(200, 0, 0), color(0, 200, 0), this.health/this.maxHealth));
        rect(-this.w/2, -50, this.health/this.maxHealth*this.w, 30);
        pop();
    }

    pop();
};
Martian.prototype.run = function(p) {
    this.collide(p);
    this.update(p);
    this.display();
};
