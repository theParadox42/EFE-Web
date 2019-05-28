function UfoBoss(x, y){
    this.x = x;
    this.y = y;
    this.img = imgs.ufoboss;
    this.w = imgs.ufoboss.width*0.5;
    this.h = imgs.ufoboss.height*0.5;
}
UfoBoss.prototype.run = function(){
    this.display();
}
UfoBoss.prototype.display = function(){
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(this.img, 0, 0, this.w, this.h);
    pop();
}
