function FlySign(x, txt){
    this.x = x;
    this.w = 600;
    this.h = 350;
    this.y = height/2-this.h/2;
    this.txt = txt;
    this.padding = 100;
    this.frame = 0;
}
FlySign.prototype.display = function(p){
    this.img = imgs.spaceSigns[round(this.frame/12)]
    this.frame ++;
    if(this.frame>12){
        this.frame = 0;
    }
    push();
    strokeCap(SQUARE);
    strokeWeight(10);
    stroke(242, 242, 242);
    fill(200);
    //rect(this.x, this.y, this.w, this.h);
    image(this.img, this.x, this.y, this.w, this.h)
    fill(0);
    noStroke();
    textSize(40);
    textFont(fonts.pixel);
    text(this.txt, this.x+this.padding, this.y+this.padding, this.w-this.padding*2, this.h-this.padding*2);
    pop();
}
let flySigns = [];
