function RunPlayer(x, y){
    this.x = x;
    this.y = y;
    this.ox = this.x;
    this.oy = this.y;
    this.w = 50;
    this.h = this.w;
    this.vx = 1;
    this.vy = 0;
    this.mvx = 5;
    this.mvy = 20;
    this.transX = -this.x+100;
    this.grounded = false;
};
RunPlayer.prototype.init = function(){
    this.img = imgs.player;
    this.h = this.w*this.img.height/this.img.width;
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
        this.vx+=xs;
    } if(keys[LEFT_ARROW] || keys.a){
        this.vx-=xs;
    } if((keys[UP_ARROW] || keys.w) && this.grounded){
        this.vy-=10;
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
    this.vy+=0.2;
    // Friction
    this.vx *= 0.75;
    this.vy *= 0.99;
    // Max velocities
    this.vx = constrain(this.vx, -this.mvx, this.mvx);
    this.vy = constrain(this.vy, -this.mvy, this.mvy);
    // Position affected by speed
    this.x+=this.vx;
    this.y+=this.vy;
    // Resets grounded
    this.grounded = false;
};
RunPlayer.prototype.display = function(){
    push();
    translate(this.x+this.w/2,this.y);

    if (this.vx>=0) scale(-1, 1);
    if(this.img) image(this.img, -this.w/2, 0, this.w, this.h);

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
}
let runPlayer = new RunPlayer(100,100);
