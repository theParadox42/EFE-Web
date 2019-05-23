function MBullet(x, y, vx){
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 10;
    this.vx = vx;
}
MBullet.prototype.collide = function(p){
    let vx = abs(this.vx);
    if(this.x+vx>p.x && this.x-vx<p.x+p.w&&this.y+this.h/2>p.y&&this.y-this.h/2<p.y+p.h){
        p.vx -= 30;
        if(typeof p.jump == "function") p.jump();
        p.health --;
        this.dead = true;
    }
}
MBullet.prototype.update = function(){
    this.x+=this.vx;
}
MBullet.prototype.display = function(){
    noStroke();
    push();
    fill(200, 225, 255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop();
}
MBullet.prototype.run = function(ents){
    for(var i = 0; i < ents.length; i ++){
        this.collide(ents[i]);
    }
    this.update();
    this.display();
}
