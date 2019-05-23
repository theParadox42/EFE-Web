function MFuel(x, y, w){
    this.x = x;
    this.y = y;
    this.img = imgs.fueltank;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
    this.collected = false;
}
MFuel.prototype.collide = function(p){
    if(p.x+p.w>this.x&&p.x<this.x+this.w&&p.y+p.h>this.y&&p.y<this.y+this.h){
        this.collected = true;
        p.fuel ++;
    }
}
MFuel.prototype.display = function(){
    push();
    translate(this.x+this.w/2, this.y);
    scale(cos(frameCount*3), 1);
    image(this.img, -this.w/2, this.y, this.w, this.h);
    pop();
}
MFuel.prototype.run = function(p){
    // this.collide(p);
    this.display();
}