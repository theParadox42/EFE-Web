function MRock(x, sy, w){
    this.x = x;
    this.y = 0;
    this.img = imgs.marsrock;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
    this.y -= this.h*(sy+1);
}
MRock.prototype.collide = function(p){
    let vx = abs(p.vx)+abs(p.kvx), vy = abs(p.vy);
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
                    if(p.vy >= 0){
                        p.grounded = true;
                    }
                }
            }
        } else if(p.y + p.h - vy-1 > this.y && p.y + vy + 1 < this.y + this.h) {
            if(p instanceof Martian){
                p.collision = true;
            }
            if(p.x + p.w / 2 > this.x + this.w / 2){
                p.x = max(p.x, this.x+this.w);
                if(p.x <= this.x + this.w){
                    p.vx = max(p.vx, 0);
                    p.kvx = max(p.kvx, 0);
                }
            } else {
                p.x = min(p.x, this.x-p.w);
                if(p.x + p.w >= this.x){
                    p.vx = min(p.vx, 0);
                    p.kvx = min(p.kvx, 0);
                }
            }
        }
    }
}
MRock.prototype.display = function(){
    push();
    image(this.img, this.x, this.y, this.w, this.h);
    pop();
}
MRock.prototype.run = function(ents){
    for(var i = 0; i < ents.length; i ++){
        this.collide(ents[i]);
    }
    this.display();
}
// The xs are %s and the ys are how many rock heights up
let mrocks = [
    {
        x: -100,
        y: 0
    },
    {
        x: -99,
        y: 0.8
    },
    {
        x: -96,
        y: 0
    },
    {
        x: -50,
        y: 0
    },
    {
        x: -47,
        y: 0.2
    },
    {
        x: -44,
        y: 0,
    },
    {
        x: 17,
        y: 0,
    },
    {
        x: 20,
        y: 0
    },
    {
        x: 23,
        y: 0,
    },
    {
        x: 22,
        y: 0.8,
    },
    {
        x: 18,
        y: 0.8,
    },
    {
        x: 20,
        y: 1.6
    },
    {
        x: 60,
        y: 0,
    },
    {
        x: 62,
        y: 0.75,
    },
    {
        x: 64,
        y: 1.5
    },
    {
        x: 64.5,
        y: 0.75
    },
    {
        x: 64.5,
        y: 0
    },
    {
        x: 80,
        y: 0,
    },
    {
        x: 83,
        y: 0.5
    }
];
