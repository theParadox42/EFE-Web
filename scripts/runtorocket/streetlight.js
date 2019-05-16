function RunStreetLight(x){
    this.img = imgs.streetlight;
    this.w = runObstacleWidth;
    this.h = this.w * this.img.height / this.img.width;
    this.x = x;
    this.y = runGround.y - this.h;
}
RunStreetLight.prototype.display = function(){
    image(this.img, this.x, this.y, this.w, this.h);
}
RunStreetLight.prototype.run = function(){
    this.display();
}
