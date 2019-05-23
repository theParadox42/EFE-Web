function MPlayer(x, y, w){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.img = imgs.player;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
    this.gun = imgs.moonGun;
    this.gun.w = this.w / 2;
    this.gun.h = this.gun.w;
    this.fuelIcon = imgs.fueltank
    this.maxHealth = 3;
    this.health = this.maxHealth;
    this.neededFuel = 50;
    this.fuel = 1;
    this.reload = 0;
    this.reloadTime = 30;
};
MPlayer.prototype.control = function(){
    if(keys[RIGHT_ARROW] || keys.d){
        this.vx+=5;
    } if(keys[LEFT_ARROW] || keys.a){
        this.vx-=5;
    } if((keys[UP_ARROW] || keys.w) && this.grounded && this.vy >= 0){
        this.vy -= 15;
    } if((keys[32] || keys[" "])&&this.reload == 0 ){
        this.reload = this.reloadTime;
        mGame.bullets.push(new MBullet(this.x+this.w/2, this.y+this.h/9+this.h/2, this.vx>=0?10:-10))
    }
};
MPlayer.prototype.update = function(){

    this.control();

    if(this.reload>0){
        this.reload--;
    }

    this.vy+=0.5;

    this.vx *= 0.75;
    this.vy *= 0.99;

    this.x+=this.vx;
    this.y+=this.vy;

    mGame.transX = constrain(-this.x, -mGame.ground.w, mGame.ground.w);
    mGame.transY = constrain(-this.y, -height, height);

    if(this.y > -mGame.transY+height/2) this.health -= 0.2;
    if(this.health <= 0) mGame.init();

    this.grounded = false;

};
MPlayer.prototype.display = function(){
    push();
    translate(this.x+this.w/2, this.y+this.h/2);

    if(this.vx>=0) scale(-1, 1);
    imageMode(CENTER)
    image(this.img, 0, 0, this.w, this.h);

    scale(-1, 1);
    image(this.gun, -this.w/8, this.h/9, this.gun.w, this.gun.h);

    pop();
};
MPlayer.prototype.displayStatus = function(){
    push();
    translate(width, 0);

    push();
    noStroke();

    // Health
    fill(lerpColor(color(200, 0, 0), color(0, 200, 0), this.health/this.maxHealth));
    rect(-230,30,this.health/this.maxHealth*200, 50);

    // Fuel
    fill(200, 75, 0);
    rect(-230, 110, this.fuel/this.neededFuel*200, 50);
    imageMode(CENTER);
    image(this.fuelIcon, -130, 135, 40*this.fuelIcon.width/this.fuelIcon.height, 40);
    pop();

    push();
    // Outlines
    stroke(100);
    strokeWeight(5);
    strokeCap(SQUARE);
    noFill();
    rect(-230, 30, 200, 50);
    rect(-230, 110, 200, 50);
    pop();

    pop();
}
