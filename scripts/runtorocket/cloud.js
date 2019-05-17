function RunCloud(x){
    this.x = x;
    this.y = random(60, 120);
    this.vx = random(-3, 3);
    this.z = random(1.5, 4);
    this.zvx = 1/this.z;
    this.img = imgs.cloud.clone();
    this.w = random(230, 350);
    this.h = this.w * this.img.getHeight() / this.img.getWidth();
}
RunCloud.prototype.update = function(p){
    this.x -= this.zvx * (p.ptransX - p.transX) + this.vx;
    if(this.x+this.w+10<0){
        this.x+=width+this.w+15;
    } else if(this.x - 10 > width){
        this.x -= width+this.w+15;
    }
}
RunCloud.prototype.display = function(){
    push();
    drawAnimation(this.img, this.x, this.y, this.w, this.h);
    pop();
}
RunCloud.prototype.run = function(p){
    this.update(p);
    this.display();
}
