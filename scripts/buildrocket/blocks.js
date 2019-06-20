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
        if(p.x + p.w - vx * 2 - 1 > this.x && p.x + vx * 2 + 1 < this.x + this.w){
            if(p.y + p.h / 2 > this.y + this.h / 2){
                p.y = max(p.y, this.y+this.h);
                if(p.y <= this.y + this.h){
                    p.vy = max(p.vy, 0);
                }
            } else {
                p.y = min(p.y, this.y-p.h);
                if(p.y + p.h >= this.y){
                    p.vy = min(p.vy, 0);
                    // if(p.vy >= 0){
                        p.grounded = true;
                    // }
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

// Asphalt
{
function BAsphalt(x, y, w, h){
    BBlock.call(this, x, y, w, h);
    this.img = imgs.asphalt;
}
BAsphalt.prototype = Object.create(BBlock.prototype);
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

// Platform
{
function BPlatform(x, y, w, h){
    BBlock.call(this, x, y, w, h);
    this.img = imgs.platform;
}
BPlatform.prototype = Object.create(BBlock.prototype);
BPlatform.prototype.collide = function(p){
    let vx = abs(p.vx), vy = abs(p.vy);
    if(p.x + p.w + vx + 1 > this.x && p.x - vx - 1 < this.x + this.w && p.y + p.h + vy > this.y && p.y - vy < this.y + this.h){
        if(p.x + p.w - vx * 2 - 1 > this.x && p.x + vx * 2 + 1 < this.x + this.w){
            if(p.y + p.h - vy - 1 < this.y && !(keys[DOWN_ARROW]||keys.s) && p.vy>0) {
                p.y = min(p.y, this.y-p.h);
                if(p.y + p.h >= this.y){
                    p.vy = min(p.vy, 0);
                    if(p.vy >= 0){
                        p.grounded = true;
                    }
                }
            }
        }
    }
}
}

// Toxic Waste
{
function BToxic(x, y, w, h){
    BBlock.call(this, x, y, w, h);
    this.img = imgs.toxic.clone();
}
BToxic.prototype = Object.create(BBlock.prototype);
BToxic.prototype.collide = function(p){
    if(p.x + p.w - 1 > this.x && p.x + 1 < this.x + this.w && p.y + p.h - 1 > this.y && p.y + 1 < this.y-this.h){
        p.health -= 5;
        p.vx *= 0.5;
        p.vy *= 0.7;
        p.tint.r -= 40;
        p.tint.b -= 40;
    }
}
BToxic.prototype.display = function(){
    push();
    translate(this.x+this.w/2, this.y+this.h/2);
    drawAnimation(this.img, 0, 0, this.w, this.h);
    pop();
};
}

// Fire
{
function BFire(x, y, w, h){
    BToxic.call(this, x, y, w, h);
    this.img = imgs.fire.clone();
}
BFire.prototype = Object.create(BToxic.prototype);
BFire.prototype.collide = function(p){
    if(p.x+p.w-1>this.x&&p.x+1<this.x+this.w&&p.y+p.h-1>this.y&&p.y+1<this.y+this.h){
        p.health -= 6;
        p.tint.g -= 18;
        p.tint.b -= 25;
    }
}
}

// Refinery
{
function BRefinery(x, y, w, h){
    BBlock.call(this, x, y, w, h);
    this.img = imgs.refinery;
};
BRefinery.prototype = Object.create(BBlock.prototype);
}

// Smoke
{
function BSmoke(x, y, w, h){
    BToxic.call(this, x, y, w, h);
    this.img = imgs.smoke.clone();
};
BSmoke.prototype = Object.create(BToxic.prototype);
BSmoke.prototype.collide = function(p){
    if(p.affectedBy.air) return;
    if(p.x+p.w>this.x&&p.x<this.x+this.w&&p.y+p.h>this.y&&p.y<this.y+this.h){
        p.affectedBy.air = true;
        p.vy-=0.6;
    }
}
}

// Water
{
function BWater(x, y, w, h){
    BBlock.call(this, x, y, w, h);
    this.img = imgs.water;
}
BWater.prototype = Object.create(BBlock.prototype);
BWater.prototype.collide = function(p){
    if(p.affectedBy.water) return;
    if(p.x+p.w>this.x&&p.x<this.x+this.w&&p.y+p.h>this.y&&p.y<this.y+this.h){
        p.tint.r -= 10.5;
        p.tint.g -= 10.2;
        if(p.tint.r <= 0){
            p.health --;
        }
        p.vx *= 0.75;
        p.vy *= 0.75;
        if((keys[32]||keys[" "]||keys[UP_ARROW]||keys.w)&&p.vy>1.4){
            p.vy -= 20;
        }
        p.affectedBy.water = true;
    }
}
}

// Proton
{
function BProton(x, y, w, h){
    BToxic.call(this, x, y, w, h);
    this.img = imgs.proton.clone();
    this.field = 300;
}
BProton.prototype = Object.create(BToxic.prototype);
BProton.prototype.collide = function(p){
    let d = dist(p.x+p.w/2, p.y+p.h/2, this.x+this.w/2, this.y+this.h/2);
    if(d<this.field){
        let force = map(d, 0, this.field, 2, 0);
        let dx = p.x-this.x;
        let dy = p.y-this.y;
        let m = mag(dx, dy);
        dx*=force/m;
        dy*=force/m;
        if(dx){
            p.vx+=dx;
        }
        if(dy){
            p.vy+=dy;
        }
    }
}
}

}

// Event Blocks
{

// BPortal
{
function BPortal(x, y, w, h){
    BBlock.call(this, x, y, w, h);
    this.img = imgs.portal;
    this.w *= 2;
    this.h *= 2;
}
BPortal.prototype = Object.create(BBlock.prototype);
BPortal.prototype.display = function(){
    push();
    imageMode(CENTER);
    translate(this.x+this.w/2, this.y+this.h/2);
    rotate(frameCount);
    image(this.img, 0, 0, this.w, this.h);
    pop();
}
BPortal.prototype.collide = function(p){
    if(!bGame.canPass) return;
    if(p.x>this.x && p.x+p.w < this.x+this.w&&p.y + p.h / 2 > this.y && p.y< this.y+this.h){
        let speed = 0.05;
        p.hasControl = false;
        p.w = lerp(p.w, 0, speed);
        p.h = lerp(p.h, 0, speed);
        p.vx = 0;
        p.vy = 0;
        p.x = lerp(p.x, this.x+this.w/2-p.w/2, speed);
        p.y = lerp(p.y, this.y+this.h/2-p.h/2, speed);
        p.r += 5;
    }
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
var BPart = [];
BPart[0] = function(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.collectIndex = 0;
    if(!this.img || this.img == imgs.garbage){
        this.img = imgs.rocketfin;
    }
    this.imgw = this.imgw || this.img.width;
    this.imgh = this.imgh || this.img.height;
    if(max(this.imgw, this.imgh) == this.imgw){
        this.dw = this.w;
        this.dh = this.w * this.imgh / this.imgw;
    } else {
        this.dh = this.h;
        this.dw = this.h * this.imgw / this.imgh;
    }
    this.collected = false;
}
BPart[0].prototype = Object.create(BBlock.prototype);
BPart[0].prototype.display = function(){
    push();
    imageMode(CENTER);
    translate(this.x+this.w/2, this.y+this.h/2+sin(frameCount)*10-5);
    scale(cos(frameCount*5), 1);
    image(this.img, 0, 0, this.dw, this.dh);
    pop();
};
BPart[0].prototype.collide = function(p){
    let vx = abs(p.vx)*2, vy = abs(p.vy)*2;
    if(p.x+p.w-vx>this.x&&p.x+vx<this.x+this.w&&p.y+p.h-vy>this.y&&p.y+vy<this.y+this.h){
        this.collected = true;
        p.collected.push(this.collectIndex);
    }
}

BPart[1] = function(x, y, w, h){
    this.img = imgs.rockettail;
    BPart[0].call(this, x, y, w, h);
    this.collectIndex = 1;
}
BPart[1].prototype = Object.create(BPart[0].prototype);


BPart[2] = function(x, y, w, h){
    this.img = this.img || imgs.rocketengine;
    this.imgw = this.img.getWidth();
    this.imgh = this.img.getHeight();
    BPart[0].call(this, x, y, w, h);
    this.collectIndex = 2;
}
BPart[2].prototype = Object.create(BPart[0].prototype);
BPart[2].prototype.display = function(){
    push();
    translate(this.x+this.w/2, this.y+this.h/2+sin(frameCount)*10-5);
    scale(cos(frameCount*5), 1);
    drawAnimation(this.img, 0, 0, this.dw, this.dh);
    pop();

}

BPart[3] = function(x, y, w, h){
    this.img = imgs.rocketflame;
    BPart[2].call(this, x, y, w, h);
}
BPart[3].prototype = Object.create(BPart[2].prototype);

}

}









// Blx R 4 U
