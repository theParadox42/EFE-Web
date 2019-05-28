function FlySign(x, txt){
    this.x = x;
    this.w = 600;
    this.h = 350;
    this.y = height/2-this.h/2;
    this.txt = txt;
    this.padding = 100;
    this.img = imgs.spacesign.clone();
}
FlySign.prototype.display = function(p){
    push();
    drawAnimation(this.img, this.x + this.w/2, this.y + this.h/2, this.w, this.h);
    fill(0);
    noStroke();
    textSize(35);
    textFont(fonts.pixel);
    text(this.txt, this.x+this.padding, this.y+this.padding, this.w-this.padding*2, this.h-this.padding*2);
    pop();
}
let flySigns = [];
