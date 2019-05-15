function RunCar(x, y){
    this.x = x;
    this.y = y;
    this.img = imgs.brokenCar;
    this.w = runObstacleWidth;
    this.h = this.w * this.img.height / this.img.width;
}
