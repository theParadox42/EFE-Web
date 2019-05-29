function UfoBoss(x, y){
    this.x = x;
    this.y = y;
    this.img = imgs.ufoboss;
    this.w = imgs.ufoboss.width*0.5;
    this.h = imgs.ufoboss.height*0.5;
    this.health = 100;
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
UfoBoss.prototype.displayHealth = function(){
    push();
    stroke(94, 94, 94);
    strokeWeight(10);
    fill(0, 0, 0, 0);
    rect(width/2-100, 50, 200, 100);
    fill(204, 14, 14);
    rect(width/2-95, 55, map(this.health, 0, 100, 0, 200), 90)
    pop();
}
