function Sign(x, txt){
    this.h = 100;
    this.w = this.h*2;
    this.x = x;
    this.y = runGround.y-300-this.h;
    this.txt = txt;
}
Sign.prototype.display = function(){
    push();
    strokeCap(SQUARE);
    strokeWeight(10);
    stroke(10);
    fill(200);
    rect(this.x, this.y, this.w, this.h);
    pop();
}
