function RunSign(x, txt){
    this.x = x;
    this.y = 50;
    this.w = 500;
    this.h = 250;
    this.dx = this.x+1000;
    this.txt = txt;
    this.padding = 50;
}
RunSign.prototype.display = function(p){
    if(p.x>this.x && this.x<this.dx){
        this.x+=p.vx;
    }
    push();
    image(imgs.woodsign, this.x, this.y, this.w, this.h);
    fill(0);
    noStroke();
    textSize(40);
    textFont(fonts.pixel);
    text(this.txt, this.x+this.padding, this.y+this.padding, this.w-this.padding*2, this.h-this.padding*2);
    pop();
}
