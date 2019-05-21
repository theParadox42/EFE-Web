// I had to put all of these in the same file, because they couldn't use inheritance if they loaded at different times


// Collision Blocks
{

// BBlock
{
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
                if(p.y + p.h >= this.y){
                    p.vy = min(p.vy, 0);
                    if(p.vy >= 0){
                        p.grounded = true;
                    }
                }
            }
        } else if(p.y + p.h - vy - 1 > this.y && p.y + vy + 1 < this.y + this.h) {
            if(p.x + p.w / 2 > this.x + this.w / 2){
                p.x = max(p.x, this.x+this.w);
                if(p.x <= this.x + this.w){
                    p.vx = max(p.vx, 0);
                }
            } else {
                p.x = min(p.x, this.x-p.w);
                if(p.x + p.w >= this.x){
                    p.vx = min(p.vx, 0);
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
}

// BSpike
{
function BSpike(x, y, w, h){
    BBlock.call(this, x, y, w, h);
    this.img = imgs.spike;
    this.m = this.x+this.w/2;
}
BSpike.prototype = Object.create(BBlock.prototype);
BSpike.prototype.collide = function(p){
    if(p.x + p.w - 1 > this.x && p.x - 1 < this.x + this.w && p.y + p.h - 1 > this.y && p.y + 1 < this.y + this.h){
        if(p.x + p.w < this.x + this.w / 2){
            if(p.y + p.h > map(p.x+p.w, this.x, this.m, this.y+this.h, this.y)){
                p.kill();
            }
        } else if(p.x > this.x + this.w / 2){
            if(p.y + p.h > map(p.x, this.m, this.x+this.w, this.y, this.y+this.h)){
                p.kill();
            }
        } else {
            p.kill();
        }
    }
}
}

// Toxic Waste
{
    
}

}

// Event Blocks
{

// BPortal
{
function BPortal(x, y, w, h){
    BBlock.call(this, x, y, w, h)
}
BPortal.prototype = Object.create(BBlock.prototype);
BPortal.prototype.collide = function(){

};
}

// BSpawn
{
function BSpawn(x, y, w, h){
    BBlock.call(this, x, y, w, h);
    // this.img = imgs.spawn
}
BSpawn.prototype = Object.create(BBlock.prototype);
BSpawn.prototype.collide = function(){
    // This doesn't need a collide function
};
BSpawn.prototype.display = function(){
    ellipse(this.x+this.w/2, this.y+this.h/2, this.w, this.h);
    // image(this.img, this.x, this.y, this.w, this.h);
}
}

// BParts
{
let BPart = [];
BPart[0] = function(){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = imgs.rocketfin
}
BPart[0].prototype = Object.create(BBlock.prototype);
BPart[1] = function(){
    BPart[0].call(this);
    this.img = imgs.rocketfin;
}
BPart[1].prototype = Object.create(BPart[0].prototype);
BPart[2] = function(){
    BPart[0].call(this);
    this.img = imgs.rocketengine;
}
BPart[2].prototype = Object.create(BPart[0].prototype);
}

}









// Blx R 4 U
