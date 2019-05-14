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
    for(var i = 0; i < width*this.h/10000; i ++){
        this.particles[i] = {
            x: random(width),
            y: random(this.h)+this.y,
        }
    }
};
RunGround.prototype.display = function(){
    push();
    translate(-runPlayer.transX, 0);
    stroke(this.stroke);
    strokeWeight(this.strokeWeight);
    fill(this.fill);
    rect(-this.strokeWeight, this.y+this.strokeWeight/2, width + this.strokeWeight * 2, this.h + this.strokeWeight);
    pop();
    push();
    for(var i = 0; i < this.particles.length; i ++){

    }
    pop();
};
let runGround = new RunGround();
