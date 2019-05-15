function Car(x, y){
    this.x = x;
    this.y = y;
    this.h = 110;
    this.w = this.h;
    this.img = {};
}
Car.prototype.init = function(){
    this.img = imgs.brokenCar;
    this.h = this.w * this.img.height / this.img.width;
};
