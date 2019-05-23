function MPlayer(x, y, w){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.img = imgs.player;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
};
MPlayer.prototype.control = function(){
    if(keys[RIGHT_ARROW] || keys.d){
        this.vx+=5;
    } if(keys[LEFT_ARROW] || keys.a){
        this.vx-=5;
    } if((keys[UP_ARROW] || keys.w) && this.grounded && this.vy >= 0){
        this.vy -= 15;
    }
};
MPlayer.prototype.update = function(){
    this.control();

    this.vy+=0.5;

    this.vx *= 0.75;
    this.vy *= 0.99;

    this.x+=this.vx;
    this.y+=this.vy;

    mGame.transX = constrain(-this.x, -mGame.ground.w, mGame.ground.w);
    mGame.transY = constrain(-this.y, -height, height);

    if(this.y > -mGame.transY+height/2) mGame.init();

    this.grounded = false;

};
MPlayer.prototype.display = function(){
    push();
    translate(this.x+this.w/2, this.y);

    if(this.vx>=0) scale(-1, 1);
    image(this.img, -this.w/2, 0, this.w, this.h);

    pop();
};
