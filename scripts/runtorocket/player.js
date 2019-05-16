function RunPlayer(x, y){
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = this.w;
    this.slowSpeed = 6;
    this.normalSpeed = 10;
    this.fastSpeed = 15;
    this.vx = this.normalSpeed;
    this.gvx = this.vx;
    this.vy = 0;
    this.mvx = 5;
    this.mvy = 20;
    this.transX = 0;
    this.grounded = false;
};
RunPlayer.prototype.init = function(){
    this.img = imgs.player;
    this.h = this.w*this.img.height/this.img.width;
    this.y = runGround.y-this.h;
    this.ox = this.x;
    this.oy = this.y;
};
RunPlayer.prototype.collide = function(){
    if(this.y+this.h+this.vy>runGround.y){
        this.y = runGround.y-this.h;
        this.vy = min(0, this.vy);
        this.grounded = true;
    }
}
RunPlayer.prototype.control = function(){
    var xs = 1;
    if(keys[RIGHT_ARROW] || keys.d){
        this.gvx = this.fastSpeed;
    } else if(keys[LEFT_ARROW] || keys.a){
        this.gvx = this.slowSpeed;
    } else {
        this.gvx = this.normalSpeed;
    } if((keys[UP_ARROW] || keys.w || keys[" "] || mouseIsPressed) && this.grounded){
        this.vy-=15;
    } if((keys[DOWN_ARROW] || keys.s) && !this.grounded){
        this.vy+=0.2;
    }
}
RunPlayer.prototype.update = function(){
    //Collisions
    this.collide();
    //Input
    this.control();
    // Gravity
    this.vy+=0.5;
    // Friction
    this.vy *= 0.99;
    // Max velocities
    this.vy = constrain(this.vy, -this.mvy, this.mvy);
    // Smooth speed changes
    this.vx = lerp(this.vx, this.gvx, 0.1);
    // Position affected by speed
    this.x+=this.vx;
    this.y+=this.vy;
    // Resets grounded
    this.grounded = false;
    // Translate
    if(this.x > width/3){
        this.transX = -this.x+width/3;
    }
};
RunPlayer.prototype.display = function(){
    push();
    translate(this.x+this.w/2,this.y);

    if (this.vx>=0) scale(-1, 1);
    image(this.img, -this.w/2, 0, this.w, this.h);

    pop();
};
RunPlayer.prototype.run = function(){
    this.update();
    this.display();
};
RunPlayer.prototype.reset = function(){
    this.vx = 0;
    this.vy = 0;
    this.x = this.ox;
    this.y = this.oy;
    this.transX = 0;
}
let runPlayer = new RunPlayer(-100,0);
