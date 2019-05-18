function FlyPlayer(x, y){
    this.x = x;
    this.y = y;
    //Having actual x and y velocities make it more realistic
    this.vx = 0;
    this.vy = 0;
    this.maxv = 14;
    this.r = 0; //rotation
    this.w = 100;
    this.h = 40;
    this.speed = 5;
    this.rvel = 0;
    // Same thing until I change them
    this.offImg = {};
    this.onImg = {};
    this.shootCooldown = 0;
}
FlyPlayer.prototype.init = function(){
    this.offImg = imgs.rocketOff;
    this.onImg = imgs.rocketOn;
    this.h = this.w * this.onImg.getHeight() / this.onImg.getWidth();
}
FlyPlayer.prototype.run = function(){
    this.display();
    this.control();
    this.update();
}
FlyPlayer.prototype.update = function(){
    this.shootCooldown ++;
    this.r += this.rvel;
    this.rvel *= 0.9;
    this.x+=this.vx;
    this.y+=this.vy;
    var m = mag(this.vx, this.vy);
    if(m>this.maxv){
        this.vx *= this.maxv/m;
        this.vy *= this.maxv/m;
    }

    this.speed *= 0.9;
    this.speed = constrain(this.speed, -5, 5);

    if(this.y - this.h / 1.7 > height){
        this.y -= height + this.h / 1.8 + this.h / 1.7;
    } else if(this.y + this.h / 1.7 < 0){
        this.y += height + this.h / 1.8 + this.h / 1.7;
    }
}
FlyPlayer.prototype.control = function(){
    if(keys[" "]){
        this.speed += 0.3;
        this.vx*=0.8;
        this.vy*=0.8;
    	this.vx += this.speed*sin(this.r);
        this.vy -= this.speed*cos(this.r);
    } else {
        this.vx*=0.99;
        this.vy*=0.99;
    }
    if(keys.z && this.shootCooldown>15){
        lasers.push(new Laser(this.x, this.y, this.r, 20));
        this.shootCooldown = 0;
    }
    if(keys[RIGHT_ARROW]||keys.d){
        this.rvel += 0.5
    }
    if(keys[LEFT_ARROW]||keys.a){
        this.rvel -= 0.5
    }
    if(keys.x){
        this.speed*=0.8;
        this.vx*=0.8;
        this.vy*=0.8;
    }
}
FlyPlayer.prototype.display = function(){
    push();
    imageMode(CENTER); //rotate from center
    translate(this.x, this.y);
    rotate(this.r);
    // scale(this.w/this.imgT.width, this.h/this.imgT.height)
    if(keys[" "]){
        drawAnimation(this.onImg, 0, 0, this.w, this.h);
    } else {
        drawAnimation(this.offImg, 0, 0, this.w, this.h);
    }
    pop();
}
let flyPlayer = new FlyPlayer(100, 100)
