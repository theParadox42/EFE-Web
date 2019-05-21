function Ufo(x, y){
    this.x = x;
    this.y = y;
    this.health = 3;
    this.frame = 0;
}
Ufo.prototype.run = function(){
    this.display();
}
Ufo.prototype.display = function(){
    this.img = imgs.ufo.clone();
    push();
    translate(this.x, this.y);
    scale(0.15)
    drawAnimation(this.img, 0, 0);
    pop();
}
let ufos = [];
