function Spike(x, y){
    this.x = x;
    this.y = y;
    this.h = 100;
}
Spike.prototype.run = function(p){
    this.display();
    this.collide(p);
}
Spike.prototype.collide = function(p){
    function death(){
        p.y = 0;
    }
    if(p.x+p.w>this.x&&p.x<this.x+this.w&&p.y+p.h>this.y&&p.y<this.y+this.h){
        if(p.x+p.w<this.x+this.w/2){
            if(p.y+p.h > map(p.x+p.w, this.x, this.x+this.w/2, this.y+this.h, this.y)) death();
        } else if(p.x > this.x+this.w/2){
            if(p.y+p.h > map(p.x, this.x+this.w/2, this.x+this.w, this.y, this.y+this.h)) death();
        } else death();
    }
}
Spike.prototype.init = function(){
    this.img = imgs.spike
    this.w = round( this.h * this.img.width / this.img.height );
    this.y = runGround.y - this.h;
}
Spike.prototype.display = function(){
    push();
    translate(this.x, this.y);
    image(this.img, 0, 0, this.w, this.h);
    pop();
}
