function RunPlayer(x, y){
    this.x = x;
    this.ox = x;
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
    this.ptransX = this.transX;
    this.controlTrans = true;
    this.grounded = false;
    this.ducking = false;
    this.walkingFrame = 0;
};
RunPlayer.prototype.init = function(){
    this.img = imgs.player;
    this.h = this.w*this.img.height/this.img.width;
    this.y = runGround.y-this.h;
    this.oy = this.y;
    this.dh = this.h/2.3;
    this.oh = this.h;
};
RunPlayer.prototype.collide = function(){
    if(this.y+this.h+this.vy>runGround.y){
        this.grounded = true;
        this.y = runGround.y - this.h;
    }
}
RunPlayer.prototype.control = function(){

    var by = this.y + this.h;

    var xs = this.ducking ? 0.6 : 1;
    if(keys[RIGHT_ARROW] || keys.d){
        this.gvx = this.fastSpeed * xs;
    } else if(keys[LEFT_ARROW] || keys.a){
        this.gvx = this.slowSpeed * xs;
    } else {
        this.gvx = this.normalSpeed * xs;
    } if((keys[UP_ARROW] || keys.w || keys[32] || keys[" "] || pressed) && this.grounded && this.vy >= 0){
        this.vy-=16;
        this.grounded = false;
    } else if(keys[DOWN_ARROW] || keys.s){
        if(this.grounded && !this.ducking){
            this.ducking = true;
        } else if(!this.grounded){
            this.ducking = false;
            this.vy += 0.3;
        }
    } else {
        this.ducking = false;
    }
    this.h = this.ducking ? this.dh : this.oh;

    this.y = by - this.h + 1;
};
RunPlayer.prototype.update = function(){
    //Collisions
    this.collide();
    if(this.grounded){
        this.vy = min(0, this.vy);
    }
    //Input
    this.control();
    // Walking animation
    if(!this.grounded){
        this.img = imgs.player;
    } else if(frameCount % 10 == 0){
        this.walkingFrame ++;
        this.walkingFrame = this.walkingFrame % imgs.players.length;
        this.img = imgs.players[this.walkingFrame];
    }
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
    this.y = min(this.y, runGround.y-this.h);
    // Resets grounded
    this.grounded = false;
    // Translate
    this.updateTranslate();
};
RunPlayer.prototype.updateTranslate = function(off, map){
    this.ptransX = this.transX;
    this.viewSpace = off ? 0 : width/3;
    if(this.x > this.viewSpace && this.controlTrans){
        this.transX = -this.x+this.viewSpace;
    }
    if(off){
        this.x = constrain(this.x, 0, map.length * runObstacleWidth - width);
        if(this.x+width >= map.length * runObstacleWidth){
            this.transX = - map.length * runObstacleWidth + width;
        }
    }
}
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
    this.controlTrans = true;
}
let runPlayer = new RunPlayer(-100,0);
