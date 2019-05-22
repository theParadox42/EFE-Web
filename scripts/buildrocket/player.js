function BPlayer(x, by, w){
    this.vx = 0;
    this.vy = 0;
    this.img = imgs.player;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
    this.x = x;
    this.y = by-this.h;
    this.grounded = false;
    this.hasControl = true;
    this.r = 0;
    this.health = 100;
    this.tint = {
        r: 255,
        g: 255,
        b: 255
    }
}
BPlayer.prototype.control = function(){
    if(keys[RIGHT_ARROW] || keys.d){
        this.vx += 5;
    } if(keys[LEFT_ARROW] || keys.a){
        this.vx -= 5;
    } if((keys[UP_ARROW]||keys.w||keys[" "]||keys[32]) && this.grounded){
        this.vy -= 15;
    } else if((keys[DOWN_ARROW]||keys.s) && !this.grounded){
        this.vy+=0.2;
    }
}
BPlayer.prototype.update = function(){
    this.tint.r = constrain(this.tint.r+10, 0, 255);
    this.tint.g = constrain(this.tint.g+10, 0, 255);
    this.tint.b = constrain(this.tint.b+10, 0, 255);

    if(this.hasControl){
        this.control();
    }

    if(!this.grounded){
        this.vy += 0.5;
    }

    this.vx *= 0.7;
    this.vy *= 0.99;
    
    this.vx = constrain(this.vx, -15, 15);
    this.vy = constrain(this.vy, -20, 20);
    
    this.x+=this.vx;
    this.y+=this.vy;

    this.grounded = false;

    if(this.x < 0){
        this.x = 0;
        this.vx = max(this.vx, 0);
    } else if(this.x + this.w > bGame.w) {
        this.x = bGame.w-this.w;
        this.vx = min(this.vx, 0);
    }

    if(this.y > bGame.h || this.health < 0) this.kill();

    if(this.w < 0.5){
        bGame.next();
    }
}
BPlayer.prototype.display = function(){
    push();
    translate(this.x+this.w/2, this.y+this.h/2);
    rotate(this.r);
    if(this.vx >= 0) scale(-1, 1);
    tint(this.tint.r, this.tint.g, this.tint.b);
    image(this.img, -this.w/2, -this.h/2, this.w, this.h);
    noTint();
    pop();
}
BPlayer.prototype.kill = function(){
    bGame.reload();
};
BPlayer.prototype.getTransX = function(){
    if(this.x < bGame.sw/3){
        return 0;
    } else if(this.x < bGame.w - bGame.sw*2/3){
        return -this.x + bGame.sw/3;
    } else {
        return -bGame.w + bGame.sw;
    }
}
