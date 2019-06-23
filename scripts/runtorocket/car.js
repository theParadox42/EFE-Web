function RunCar(x){
    this.x = x;
    this.img = imgs.brokenCar;
    this.w = runObstacleWidth * 2;
    this.h = this.w * this.img.height / this.img.width;
    this.y = runGround.y - this.h;
}
RunCar.prototype.display = function(){
    image(this.img, this.x, this.y, this.w, this.h);
}
RunCar.prototype.collide = function(p){
    let vx = abs(p.vx), vy = abs(p.vy);
    if(p.x + p.w + vx > this.x && p.x - vx < this.x + this.w && p.y + p.h + vy > this.y){
        if(p.y + p.h - vy * 2 - 1 < this.y){
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
RunCar.prototype.run = function(p){
    var dx = this.x + runPlayer.transX;
    if(dx + runPlayer.vx + this.w > 0 && dx - runPlayer.vx < width){
        this.collide(p);
        this.display();
    }
}
