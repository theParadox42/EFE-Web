function UfoBoss(x, y, r){
    this.x = x;
    this.y = y;
    this.img = imgs.ufoboss;
    this.r = r || 300;
    this.w = this.r*2;
    this.h = this.w * this.img.height / this.img.width;
    this.r = (this.w+this.h) / 4
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
    let r = this.r + (p.w + p.h) / 4;
    if (distance < r) {
        p.x -= p.vx;
        p.y -= p.vy;
        p.thrustCooldown = 0;
        var pm = mag(p.vx, p.vy) * 2;
        var dx = p.x-this.x;
        var dy = p.y-this.y;
        var dm = mag(dx, dy);
        var mm = pm / dm
        dx *= mm;
        dy *= mm;
        p.vx += dx;
        p.vy += dy;
        // p.health --;
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
    this.displayHealth();
}
UfoBoss.prototype.displayHealth = function(){
    push();
    noStroke();
    fill(204, 14, 14);
    rect(this.x-this.w/3, this.y-this.h*0.8, this.w*2/3*this.health/100, this.h*0.2);
    stroke(94, 94, 94);
    strokeWeight(10);
    noFill();
    rect(this.x-this.w/3, this.y-this.h*0.8, this.w*2/3, this.h*0.2);
    pop();
}
