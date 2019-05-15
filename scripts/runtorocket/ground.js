function RunGround(){
    this.y = 0;
    this.h = 100;
    this.particles = [];
};
RunGround.prototype.init = function(){
    this.stroke = color(0, 160, 50);
    this.strokeWeight = 10;
    this.fill = color(80,50,0);
    this.y = height-this.h;
    this.particles = [];
    for(var i = 0; i < width*this.h/5000; i ++){
        this.particles[i] = {
            x: random(width),
            y: random(this.h-this.strokeWeight)+this.y+this.strokeWeight,
            w: random(15, 30),
            sat: random(80, 100)
        }
    }
};
RunGround.prototype.display = function(){
    push();
    translate(-runPlayer.transX, 0);
    stroke(this.stroke);
    strokeWeight(this.strokeWeight);
    fill(this.fill);
    rect(-25, this.y+this.strokeWeight/2, width + 50, this.h + this.strokeWeight);
    pop();
    push();
    noStroke();
    for(var i = 0; i < this.particles.length; i ++){
        var par = this.particles[i];
        fill(par.sat, par.sat * 0.8, 0, 100);
        rect(par.x, par.y, par.w, par.w, 5);
        if(par.x+par.w<-runPlayer.transX){
            par.x+=par.w*2+width;
        }
    }
    pop();
};
let runGround = new RunGround();
