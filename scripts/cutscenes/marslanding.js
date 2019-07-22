function marsLanding(){
    marsLanding.draw();
}
marsLanding.init = function(){
    // Arranging the background
    this.background = {
        img: imgs.marsbackground,
        x: 0,
        y: 0,
    }
    this.background.aspect = this.background.img.width / this.background.img.height
    let canvasAspect = width / height;
    if(this.background.aspect > canvasAspect){
        this.background.h = height;
        this.background.w = this.background.h * this.background.aspect;
    } else {
        this.background.w = width;
        this.background.h = this.background.w * (1/this.background.aspect);
    }

    // Ground
    this.ground = {
        img: imgs.marsarena,
        x: width/4,
        y: height*2/3,
        w: width,
        h: 10
    }
    this.ground.h = this.ground.w * this.ground.img.height / this.ground.img.width;

    // Letter
    this.letter = {
        img: imgs.letter,
        x: this.ground.x+this.ground.w/2,
        y: this.ground.y-5,
        w: 100,
        h: 100
    }
    this.letter.h = this.letter.w
    this.letter.y -= this.letter.h
    // Large letter
    this.largeletter = {
        img: imgs.largeletter,
        x: 0,
        y: 0,
        w: min(width, height) - 50,
        h: 1,
        display: false,
    }
    this.largeletter.h = this.largeletter.w;
    this.largeletter.x = width/2-this.largeletter.w/2;
    this.largeletter.y = height/2-this.largeletter.h/2;

    // Rock
    this.rock = {
        img: imgs.marsrock,
        x: this.letter.x-20,
        y: this.ground.y,
        w: this.letter.w + 80,
        h: 1
    }
    this.rock.h = this.rock.w * this.rock.img.height / this.rock.img.width;
    this.rock.y -= this.rock.h;

    // Rocket
    this.rocket = {
        img: imgs.rocketOn,
        x: this.ground.x + 30,
        y: -300,
        w: 150,
        h: 1
    }
    this.rocket.h = this.rocket.w * this.rocket.img.getHeight() / this.rocket.img.getWidth()
    this.rocket.collideH = this.rocket.h * 23/24

    // rocket stutter
    this.working = 1;
    this.stutterIndex = 0;
    this.stutterTimer = 5;
    this.stutterPath = [
        1, 1, 1, 1, 0.3, 1, 1, 1, 0.3, 1, 0.3, 0.3, 1, 0.3, 0.3, 0.3, 0
    ]

    // Player
    this.player = {
        img: imgs.player,
        x: this.rocket.x+this.rocket.w/4,
        y: this.ground.y,
        w: this.rocket.w/2,
        h: 1,
        display: false,
        s: -1,
    }
    this.player.h = this.player.w * this.player.img.height / this.player.img.width;
    this.player.y -= this.player.h;

    // Martian
    this.martian = {
        img: imgs.martian,
        x: width/2,
        y: -5,
        w: 150,
        h: 1
    }
    this.martian.h = this.martian.w * this.martian.img.height / this.martian.img.width;
    this.martian.y -= this.martian.h;

    // Text
    this.text = [
        "Oh &@#$!",
        "I'm out of fuel!",
        "I better go find some..."
    ]
    this.textIndex = 0;
    this.textTime = 100;
    this.textTimer = this.textTime;
    this.playertext = this.text[0];
    this.displaytext = false;

    // stage
    this.stage = "landing"
}
marsLanding.draw = function(){
    this.update();
    this.display();
}
marsLanding.update = function(){

    switch(this.stage){
        case "landing":
            this.rocket.y += 15;
            if(this.rocket.y+this.rocket.collideH >= this.ground.y){
                this.rocket.y = this.ground.y - this.rocket.collideH;
                this.stage = "player";
                this.rocket.img = imgs.rocketOff;
                this.player.display = true;
            }
        break;
        case "player":
            this.player.x += 5;
            if(this.player.x >= this.rock.x){
                this.player.x = this.rock.x + 5;
                this.stage = "letter";
                this.letterdelay = 15;
                this.letter.y -= this.player.h/3;
            }
        break;
        case "letter":
            if(this.letterdelay > 0){
                this.letterdelay --;
            } else if(!this.largeletter.display){
                this.largeletter.display = true;
            } else if(clicked || keys[32] || keys[" "]){
                this.largeletter.display = false;
                this.stage = "gotorocket"
                this.player.s = 1;
                this.letter.y += this.player.h / 3
            }
        break;
        case "gotorocket":
            this.player.x -= 5;
            if(this.player.x <= this.rocket.x){
                this.player.display = false;
                this.player.x = this.rocket.x + this.rocket.w/2 - this.player.w/2;
                this.stage = "checkfuel";
            }
        break;
        case "checkfuel":
            this.stutterTimer --;
            if(this.stutterTimer <= 0){
                this.stutterTimer += 5;
                this.stutterIndex ++;
                this.working = this.stutterPath[this.stutterIndex];
            }
            if(this.working > 0.5){
                this.rocket.img = imgs.rocketOn;
            } else if(this.working < 0.1){
                this.stage = "nofuel";
                this.player.display = true;
                this.player.s = -1;
            } else {
                this.rocket.img = imgs.rocketOff;
            }
        break;
        case "nofuel":
            if(this.player.x < this.rocket.x+this.rocket.w+15){
                this.player.x += 5;
            } else {
                this.displaytext = true;
                this.textTimer --;
                if(this.textTimer <= 0){
                    this.textTimer = this.textTime;
                    this.textIndex ++;
                    if(this.textIndex >= this.text.length){
                        this.stage = "leave";
                        this.displaytext = false;
                    } else {
                        this.playertext = this.text[this.textIndex];
                    }
                }
            }
        break;
        case "leave":
            this.player.x += 5;
            if(this.player.x > width*1.1){
                this.stage = "martian";
            }
        break;
        case "martian":
            if(this.martian.y + this.martian.h < this.ground.y){
                this.martian.y += 15;
                this.martian.y = min(this.martian.y, this.ground.y - this.martian.h);
            } else {
                this.martian.x += 5;
                if(this.martian.x > width * 1.1){
                    game.continue();
                }
            }
        break;
    }
}
marsLanding.displayObject = function(obj){
    image(obj.img, obj.x, obj.y, obj.w, obj.h);
}
marsLanding.display = function(){
    this.displayObject(this.background);
    this.displayObject(this.ground);
    this.displayObject(this.rock);
    this.displayObject(this.letter);
    this.displayObject(this.martian);
    if(this.player.display){
        push();
        translate(this.player.x+this.player.w/2, this.player.y);
        scale(this.player.s, 1);
        image(this.player.img, -this.player.w/2, 0, this.player.w, this.player.h);
        pop();
    }
    drawAnimation(this.rocket.img, this.rocket.x+this.rocket.w/2, this.rocket.y+this.rocket.h/2, this.rocket.w, this.rocket.h);
    if(this.displaytext){
        push();
        fill(255);
        stroke(232);
        strokeWeight(2);
        textSize(25);
        textFont(fonts.pixel);
        var ty = textAscent() + textDescent();
        textAlign(LEFT, TOP)
        rect(this.player.x-5, this.player.y-ty-20, textWidth(this.playertext)+10, ty+15)
        noStroke();
        fill(0);
        text(this.playertext, this.player.x, this.player.y-ty-10);
        pop();
    }

    if(this.largeletter.display){
        push();
        noStroke();
        fill(0, 80);
        rect(0, 0, width, height);
        pop();
        this.displayObject(this.largeletter);
    }
}
