function RunStreetLight(x){
    this.img = imgs.streetlight;
    this.w = runObstacleWidth;
    this.h = this.w * this.img.height / this.img.width;
    this.x = x;
    this.y = runGround.y - this.h;
    this.ly = this.y + this.h * 12/22;
}
RunStreetLight.prototype.collide = function(p){
    let vx = abs(p.vx);
    let vy = abs(p.vy);
    if(p.x + p.w > this.x && p.x < this.x+this.w && p.y + p.h + vy > this.y && p.y - vy < this.ly){
        if(p.x > this.x + this.w/2){
            if(p.y + p.h > map(p.x, this.x+this.w/2,this.x+this.w,this.y,this.ly-this.h/10)){
                loadRun.reload();
            }
        } else {
            loadRun.reload();
        }
    }
}
RunStreetLight.prototype.display = function(){
    image(this.img, this.x, this.y, this.w, this.h);
}
RunStreetLight.prototype.run = function(p){
    this.collide(p);
    this.display();
}
