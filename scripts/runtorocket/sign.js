function RunSign(x, txt){
    this.x = x;
    this.y = 50;
    this.w = 500;
    this.h = 250;
    this.dx = this.x+this.w;
    this.txt = txt;
    this.padding = 50;
}
RunSign.prototype.display = function(p){
    if(p.x>this.x && this.x<this.dx){
        this.x+=p.vx;
    }
    push();
    // strokeCap(SQUARE);
    // strokeWeight(10);
    // stroke(10);
    // fill(200);
    // rect(this.x, this.y, this.w, this.h);
    image(imgs.woodsign, this.x, this.y, this.w, this.h);
    fill(0);
    noStroke();
    textSize(50);
    textFont(fonts.pixel);
    text(this.txt, this.x+this.padding, this.y+this.padding, this.w-this.padding*2, this.h-this.padding*2);
    pop();
}
