function RunCar(x, y){
    this.x = x;
    this.img = imgs.brokenCar;
    this.w = runObstacleWidth;
    this.h = this.w * this.img.height / this.img.width;
    this.y = runGround.y - this.h;
}
RunCar.prototype.display = function(){
    image(this.img, this.x, this.y, this.w, this.h);
}
RunCar.prototype.collide = function(p){
    let vx = abs(p.vx), vy = abs(p.vy);
    if(p.x + p.w + vx > this.x && p.x - vx < this.x + this.w && p.y + p.h + vy > this.y){
        if(p.y + p.h - p.vy - 1 < this.y){
            p.y = min(p.y, this.y-p.h);
            p.vy = min(p.vy, 0);
            p.grounded = true;
        }
    }
}
RunCar.prototype.run = function(p){
    this.collide(p);
    this.display();
}
