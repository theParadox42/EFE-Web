function BPlayer(x, y, w){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.img = imgs.player;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
    this.grounded = false;
}
BPlayer.prototype.control = function(){
    if(keys[RIGHT_ARROW] || keys.d){
        this.vx += 3;
    } if(keys[LEFT_ARROW] || keys.a){
        this.vx -= 3;
    } if((keys[UP_ARROW]||keys.w||keys[" "]||keys[32]) && this.grounded){
        this.vy -= 10;
    } else if((keys[DOWN_ARROW]||keys.s) && !this.grounded){
        this.vy+=0.2;
    }
}
BPlayer.prototype.update = function(){

    if(!this.grounded){
        this.vy += 0.5;
    }

    this.vx *= 0.7;
    this.x+=this.vx;
    this.y+=this.vy;

    this.grounded = false;
}
BPlayer.prototype.display = function(){
    push();
    translate(this.x+this.w/2, this.y+this.h/2);
    if(this.vx >= 0) scale(-1, 1);
    image(this.img, -this.w/2, -this.h/2, this.w, this.h);
    pop();
}
BPlayer.prototype.run = function(){
    this.control();
    this.update();
    this.display();
}
