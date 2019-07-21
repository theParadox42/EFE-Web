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

    // Player
    this.player = {
        img: imgs.player,
        x: this.rocket.x+this.rocket.w/4,
        y: this.ground.y,
        w: this.rocket.w/2,
        h: 1,
        display: false
    }
    this.player.h = this.player.w * this.player.img.height / this.player.img.width;
    this.player.y -= this.player.h;

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
            }
        break;
        case "letter":
            this.letter.y = this.player.y+this.player.h/3;
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
    if(this.player.display){
        push();
        translate(this.player.x+this.player.w/2, this.player.y);
        scale(-1, 1);
        image(this.player.img, -this.player.w/2, 0, this.player.w, this.player.h);
        pop();
    }
    drawAnimation(this.rocket.img, this.rocket.x+this.rocket.w/2, this.rocket.y+this.rocket.h/2, this.rocket.w, this.rocket.h);
}
