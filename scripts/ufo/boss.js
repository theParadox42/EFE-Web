function UfoBoss(x, y){
    this.x = x;
    this.y = y;
    this.img = imgs.ufoboss;
    this.w = imgs.ufoboss.width*0.45;
    this.h = imgs.ufoboss.height*0.45;
    this.health = 100;
    this.radius = this.w/2;
    this.frame = 0;
    this.shootWait = 120;
}
UfoBoss.prototype.run = function(p){
    this.display();
    this.collide(p);
    this.update(p);
}
UfoBoss.prototype.update = function(p){
    if(this.health < 1){
        this.dead = true;
        this.img = imgs.explosion[round(this.frame/2)]; //image only switches every other frame
        this.frame ++;
    }
    if(frameCount%this.shootWait === 0){
        lasers.push(new Laser(this.x, this.y, -atan2(this.x-p.x, this.y-p.y), 4, "boss"));
        this.shootWait = round(random(80, 140)); 
    }
}
UfoBoss.prototype.collide = function(p){
    let distance = dist(this.x, this.y, p.x, p.y)
    let r = this.radius + (p.w + p.h) / 4;
    if (distance < r) {
        p.x -= p.vx;
        p.y -= p.vy;
        p.thrustCooldown = 0;
        p.vx *= -2.5;
        p.vy *= -2.5;
        p.health --;
    }
    for(var i in lasers){
        let l = lasers[i];
        if(l.belongsTo !== "boss"){
            distance = dist(this.x, this.y, l.x, l.y);
            r = l.radius + this.radius;
            if (distance < r) {
                l.dead = true;
                this.health --;
            }
        }
    }
}
UfoBoss.prototype.display = function(){
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(this.img, 0, 0, this.w, this.h);
    pop();
}
UfoBoss.prototype.displayHealth = function(){
    push();
    stroke(94, 94, 94);
    strokeWeight(10);
    fill(0, 0, 0, 0);
    rect(width/2-100, 50, 200, 100);
    noStroke();
    fill(204, 14, 14);
    rect(width/2-95, 55, map(this.health, 0, 100, 0, 190), 90)
    pop();
}
