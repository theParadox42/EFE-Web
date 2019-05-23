function MRock(x, y, w){
    this.x = x;
    this.y = y;
    this.img = imgs.marsrock;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
}
MRock.prototype.display = function(){

}
MRock.prototype.collide = function(p){

}
MRock.prototype.run = function(p){
    this.collide(p);
    this.display();
}
