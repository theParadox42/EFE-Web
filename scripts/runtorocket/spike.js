function RunSpike(x, y){
    this.x = x;
    this.y = y;
    this.img = imgs.spike
    this.w = runObstacleWidth;
    this.h = round(this.h * this.img.height / this.img.width);
    this.y = runGround.y - this.h;
}
RunSpike.prototype.run = function(p){
    this.display();
    this.collide(p);
}
RunSpike.prototype.collide = function(p){
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
RunSpike.prototype.init = function(){
}
RunSpike.prototype.display = function(){
    push();
    translate(this.x, this.y);
    image(this.img, 0, 0, this.w, this.h);
    pop();
}
