function RunSpike(x){
    this.x = x;
    this.img = imgs.spike
    this.w = runObstacleWidth;
    this.h = round(this.w * this.img.height / this.img.width);
    this.y = runGround.y - this.h;
}
RunSpike.prototype.run = function(p){
    var dx = this.x + runPlayer.transX;
    if(dx + runPlayer.vx + this.w > 0 && dx - runPlayer.vx < width){
        this.display();
        this.collide(p);
    }
}
RunSpike.prototype.collide = function(p){
    function death(){
        loadRun.reload();
    }
    if(p.x+p.w>this.x&&p.x<this.x+this.w&&p.y+p.h>this.y&&p.y<this.y+this.h){
        if(p.x+p.w<this.x+this.w/2){
            if(p.y+p.h > map(p.x+p.w, this.x, this.x+this.w/2, this.y+this.h, this.y)) death();
        } else if(p.x > this.x+this.w/2){
            if(p.y+p.h > map(p.x, this.x+this.w/2, this.x+this.w, this.y, this.y+this.h)) death();
        } else death();
    }
}
RunSpike.prototype.display = function(){
    push();
    translate(this.x, this.y);
    image(this.img, 0, 0, this.w, this.h);
    pop();
}
