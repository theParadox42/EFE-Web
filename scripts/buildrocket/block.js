function BBlock(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}
BBlock.prototype.display = function(){
    fill(255);
    stroke(0);
    strokeWeight(1);
    rect(this.x, this.y, this.w, this.h);
};
BBlock.prototype.update = function(){

}
BBlock.prototype.run = function(){
    this.update();
    this.display();
}
console.log(new BBlock());
