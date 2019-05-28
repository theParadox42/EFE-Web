function MPlayer(x, y, w){
    this.x = x;
    this.y = y;
    this.ox = this.x;
    this.oy = this.y;
    this.vx = 0;
    this.kvx = 0;
    this.vy = 0;
    this.img = imgs.player;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
    this.gun = imgs.moonGun;
    this.gun.w = this.w / 2;
    this.gun.h = this.gun.w;
    this.fuelIcon = imgs.fueltank
    this.heartIcon = imgs.pixelheart;
    this.maxlifes = 3;
    this.lifes = this.maxlifes;
    this.maxHealth = 10;
    this.health = this.maxHealth;
    this.dhealth = this.health;
    this.neededFuel = 10;
    this.fuel = 0;
    this.dfuel = this.fuel;
    this.reload = 0;
    this.reloadTime = 36;
    this.cooldownTime = 30;
    this.cooldown = this.cooldownTime;
    this.direction = RIGHT;
};
MPlayer.prototype.damage = function(){
    if(this.cooldown == 0){
        this.health --;
        this.cooldown = this.cooldownTime;
    }
}
MPlayer.prototype.control = function(){
    if(keys[RIGHT_ARROW] || keys.d){
        this.vx+=5;
        this.direction = RIGHT;
    } if(keys[LEFT_ARROW] || keys.a){
        this.direction = LEFT;
        this.vx-=5;
    } if((keys[UP_ARROW] || keys.w) && this.grounded && this.vy > -1){
        this.vy -= 20;
        this.grounded = false;
    } if((keys[32] || keys[" "])&&this.reload == 0){
        this.reload = this.reloadTime;
        mGame.bullets.push(new MBullet(this.x+this.w/2, this.y+this.h/9+this.h/2, 20*(this.direction==RIGHT?1:-1)+this.vx))
    }
};
MPlayer.prototype.update = function(){

    this.control();

    if(this.reload>0){
        this.reload--;
    } if(this.cooldown>0){
        this.cooldown--;
    }

    this.vy+=0.5;

    this.vx *= 0.75;
    this.kvx *= 0.9;
    this.vy *= 0.99;

    this.x+=this.vx + this.kvx;
    this.y+=this.vy;

    mGame.transX = constrain(-this.x, -mGame.ground.w, mGame.ground.w);
    mGame.transY = constrain(-this.y, -height, this.h);

    if(this.y > height*1.5) this.health -= 0.2;
    if(this.health <= 0){
        this.lifes--;
        if(this.lifes<=0){
            mGame.init();
        } else {
            mGame.reload();
        }
    }

    this.grounded = false;

    if(this.fuel >= this.neededFuel){
        game.continue();
    }

    this.dfuel = lerp(this.dfuel, this.fuel, 0.1);
    this.dhealth = lerp(this.dhealth, this.health, 0.1);
};
MPlayer.prototype.display = function(){
    if(this.cooldown == 0 || frameCount%8<4){
        push();
        translate(this.x+this.w/2, this.y+this.h/2);

        if(this.direction==RIGHT) scale(-1, 1);
        imageMode(CENTER)
        image(this.img, 0, 0, this.w, this.h);

        scale(-1, 1);
        image(this.gun, -this.w/8, this.h/9, this.gun.w, this.gun.h);

        pop();
    }
};
MPlayer.prototype.displayStatus = function(){
    push();
    translate(width, 0);

    push();
    noStroke();

    // Lifes
    for(var i = 0; i < this.lifes; i ++){
        let hw = 50;
        image(this.heartIcon, -(i+1)*200/3+hw/8-30, 10, hw, hw);
    }

    // Health
    fill(lerpColor(color(200, 0, 0), color(0, 200, 0), this.dhealth/this.maxHealth));
    rect(-230, 70,this.dhealth/this.maxHealth*200, 50);

    // Fuel
    fill(200, 120, 0);
    rect(-230, 130, this.dfuel/this.neededFuel*200, 50);
    imageMode(CENTER);
    image(this.fuelIcon, -130, 155, 40*this.fuelIcon.width/this.fuelIcon.height, 40);
    pop();

    push();
    // Outlines
    stroke(100);
    strokeWeight(5);
    strokeCap(SQUARE);
    noFill();
    rect(-230, 70, 200, 50);
    rect(-230, 130, 200, 50);
    pop();

    pop();
}
MPlayer.prototype.reset = function(){
    this.x = this.ox;
    this.y = this.oy;
    this.vx = 0;
    this.vy = 0;
    // this.fuel = constrain(this.fuel-~~random(1, 3), 0, this.neededFuel);
    this.health = this.maxHealth;
}
