function BSpike(x, y, w, h){
    BBlock.call(this, x, y, w, h);
    this.img = imgs.spike;
}
BSpike.prototype = Object.create(BBlock.prototype);
