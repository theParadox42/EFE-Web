function FlyPlayer(x, y){
    this.x = x;
    this.y = y;
    this.r = 0; //rotation
    this.w = 100;
    this.h = 40;
    this.speed = 0;
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
    this.y += this.speed*sin(this.r);
	this.x += this.speed*cos(this.r);
    this.speed *= 0.99;
    this.speed = constrain(this.speed, -14, 14);
}
FlyPlayer.prototype.control = function(){
    if(keys[32]){
        this.speed += 0.1;
    }
    if(keys[RIGHT_ARROW]||keys.d){
        this.rvel += 0.005
    }
    if(keys[LEFT_ARROW]||keys.a){
        this.rvel -= 0.005
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
