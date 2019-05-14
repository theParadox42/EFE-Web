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
}
FlyPlayer.prototype.run = function(){
    this.display();
    this.control();
    this.update();
}
FlyPlayer.prototype.update = function(){
    this.r += this.rvel;
    this.rvel *= 0.9;
    this.x+=this.vx;
    this.y+=this.vy;
    var m = mag(this.vx, this.vy);
    if(m>this.maxv){
        this.vx *= this.maxv/m;
        this.vy *= this.maxv/m;
        console.log("!")
    }

    this.speed *= 0.9;
    this.speed = constrain(this.speed, -5, 5);
}
FlyPlayer.prototype.control = function(){
    if(keys[" "]){
        this.speed += 0.3;
        this.vx*=0.8;
        this.vy*=0.8;
    	this.vx += this.speed*cos(this.r);
        this.vy += this.speed*sin(this.r);
    } else {
        this.vx*=0.99;
        this.vy*=0.99;
    }
    if(keys[RIGHT_ARROW]||keys.d){
        this.rvel += 0.5
    }
    if(keys[LEFT_ARROW]||keys.a){
        this.rvel -= 0.5
    }
    if(keys.z){
        this.speed*=0.8;
        this.vx*=0.8;
        this.vy*=0.8;
    }
}
FlyPlayer.prototype.display = function(){
    //no rocket ship image, just a placeholder rectangle. They call me a fun guy
    fill(229, 229, 229);
    push();
    rectMode(CENTER); //rotate from center
    translate(this.x, this.y);
    rotate(this.r);
    rect(0, 0, this.w, this.h);
    fill(0, 0, 0);
    textSize(8);
    textAlign(CENTER, CENTER);
    text("THIS IS A PLACEHOLDER", 0, 0)
    if(keys[32]){
        fill(232, 37, 37);
        rect(-this.w/2-10, 0, 25, this.h)
    }
    pop();
}
let flyPlayer = new FlyPlayer(100, 100)
