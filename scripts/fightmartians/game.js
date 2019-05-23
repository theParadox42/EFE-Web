let mGame = {
    player: null,
    martians: [],
    bullets: [],
    fuels: [],
    ground: {
        y: 0,
        w: 2500,
        h: 0,
        display: function(){
            push();
            imageMode(CENTER);
            image(this.img, 0, this.y+this.h/2, this.w, this.h);
            pop();
        },
        collide: function(ents){
            for(var i = 0; i < ents.length; i ++){
                let p = ents[i];
                let vy = abs(p.vy) * 2;
                if(p.x + p.w > -this.w/2 && p.x < this.w/2 && p.y + p.h + vy/2 > this.y && p.y + p.h*0.9 - vy < this.y){
                    p.y = min(p.y, this.y-p.h);
                    p.vy = min(p.vy, 0);
                    p.grounded = true;
                }
            }
        }
    },
    background: {
        w: 0,
        h: 0,
        img: {}
    },
    transX: 0,
    transY: 0,
    init: function(){
        // Player
        this.player = new MPlayer(-30, -200, 60);
        // Ground
        this.ground.img = imgs.marsarena;
        this.ground.h = this.ground.w * this.ground.img.height / this.ground.img.width;
        // Background
        this.background.img = imgs.stars;
        this.background.w = width + 120;
        this.background.h = this.background.w * this.background.img.height / this.background.img.width;
        // Martian
        this.martians = [];
        this.martians.push(new Martian(-this.ground.w/2+50, -200, 100));
        // Other
        this.bullets = [];
        this.fuels = [];
    },
    run: function(){
        
        if(this.martians.length<constrain(map(frameCount, 50, 1000),1, 10))){
            if(this.player.x>0){
                this.martians.push(new Martian(random(-this.ground.w, -width/2-110), -200, 100));
            } else {
                this.martians.push(new Martian(random(this.ground.w-100, width/2+110), -200, 100));
            }
        }
        
        push();
        translate(map(this.transX, -this.ground.w/2, this.ground.w/2, -50, 50)+width/2, map(this.transY, -height, height, -50, 50)+height/2);
        imageMode(CENTER);
        image(this.background.img, 0, 0, this.background.w, this.background.h);
        pop();

        push();
        this.player.update();
        translate(this.transX+width/2, this.transY+height/2);
        this.ground.display();
        this.ground.collide([this.player].concat(this.martians))
        for(var i = this.martians.length-1; i > -1; i --){
            this.martians[i].run(this.player);
            if(this.martians[i].dead){
                this.martians.splice(i, 1);
            }
        }
        for(var i = this.bullets.length-1; i > -1; i --){
            this.bullets[i].run(this.martians);
            if(this.bullets[i].dead){
                this.bullets.splice(i, 1);
            }
        }
        for(var i = this.fuels.length-1; i > -1; i --){
            this.fuels[i].run(this.player);
            if(this.fuels[i].collected){
                this.fuels.splice(i, 1);
            }
        }
        this.player.display();
        pop();
        
        this.player.displayStatus();
    }
};
