function BSpawn(x, y, w, h){
    BBlock.call(this, x, y, w, h);
    // this.img = imgs.spawn
}
BSpawn.prototype = Object.create(BBlock.prototype);
BSpawn.prototype.collide = function(){
    // This doesn't need a collide function
};
BSpawn.prototype.display = function(){
    ellipse(this.x+this.w/2, this.y+this.h/2, this.w, this.h);
}
