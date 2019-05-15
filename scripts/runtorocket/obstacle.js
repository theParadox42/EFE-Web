function Obstacle(x, y, type){
    this.x = x;
    this.y = y;
    this.type = type;
}
Obstacle.prototype.run = function(p){
    this.display();
    this.collide(p);
}
Obstacle.prototype.collide = function(p){
    if(p.x+p.w>this.x&&p.x<this.x+this.w&&p.y+p.h>this.y&&p.y<this.y+this.h){
        p.y = 50;
    }
}
Obstacle.prototype.init = function(){
    if(this.type === "spike"){
        this.img = imgs.spike
    } else if(this.type === "broken car"){
        this.img = imgs.brokenCar;
    }
    this.w = this.img.width/10;
    this.h = this.img.height/10;
    this.y = runGround.y+runGround.strokeWeight/2-this.h
}
Obstacle.prototype.display = function(){
    push();
    translate(this.x, this.y);
    image(this.img, 0, 0, this.w, this.h);
    pop();
}
let obstacles = [];
function createObstacles(){
    let maxDistanceBetween = 900;
    for(var i = 1000; i < 10000; i += random(500, maxDistanceBetween)){
        if(round(random(0, 1)) === 0){
            obstacles.push(new Obstacle(i, 500, "spike"))
        } else{
            obstacles.push(new Obstacle(i, 500, "broken car"))
        }
        maxDistanceBetween -= random(10, 50);
    }
}
