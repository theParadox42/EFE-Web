function BBlock(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = imgs.garbage;
}
BBlock.prototype.collide = function(p){
    let vx = abs(p.vx), vy = abs(p.vy);
    if(p.x + p.w + vx + 1 > this.x && p.x - vx - 1 < this.x + this.w && p.y + p.h + vy > this.y && p.y - vy < this.y + this.h){
        if(p.x + p.w - vx - 1 > this.x && p.x + vx + 1 < this.x + this.w){
            if(p.y + p.h / 2 > this.y + this.h / 2){
                p.y = max(p.y, this.y+this.h);
                if(p.y <= this.y + this.h){
                    p.vy = max(p.vy, 0);
                }
            } else {
                p.y = min(p.y, this.y-p.h);
                p.grounded = true;
                if(p.y + p.h >= this.y){
                    p.vy = min(p.vy, 0);
                }
            }
        }
    }
}
BBlock.prototype.display = function(){
    image(this.img, this.x, this.y, this.w, this.h);
};
BBlock.prototype.run = function(p){
    this.collide(p);
    this.display();
}
