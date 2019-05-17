function RunTrash(x, y){
    this.x = x;
    this.img = imgs.trash;
    this.w = runObstacleWidth;
    this.h = this.w * this.img.height / this.img.width;
    this.y = runGround.y - this.h;
}
RunTrash.prototype.display = function(){
    image(this.img, this.x, this.y, this.w, this.h);
}
RunTrash.prototype.collide = function(p){
    let vx = abs(p.vx), vy = abs(p.vy);
    if(p.x + p.w + vx > this.x && p.x - vx < this.x + this.w && p.y + p.h + vy > this.y){
        if(p.y + p.h - p.vy - 1 < this.y){
            p.y = min(p.y, this.y-p.h);
            p.vy = min(p.vy, 0);
            p.grounded = true;
        }
        if(p.x+p.w+vx>this.x&&p.x+p.w<=this.x+vx){
            p.vx = constrain(p.vx, -100, 0);
            p.x = this.x-p.w;
        }
    }
}
RunTrash.prototype.run = function(p){
    var dx = this.x + runPlayer.transX;
    if(dx + runPlayer.vx + this.w > 0 && dx - runPlayer.vx < width){
        this.collide(p);
        this.display();
    }
}
