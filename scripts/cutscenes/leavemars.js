function leaveMars(){
    leaveMars.draw();
}
leaveMars.init = function(){
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
        img: imgs.rocketOff,
        x: this.ground.x + 30,
        y: this.ground.y,
        w: 150,
        h: 1
    }
    this.rocket.h = this.rocket.w * this.rocket.img.getHeight() / this.rocket.img.getWidth()
    this.rocket.ch = this.rocket.h * 23/24;
    this.rocket.y -= this.rocket.ch

    // Player
    this.player = {
        img: imgs.player,
        x: width*1.1,
        y: this.ground.y,
        w: this.rocket.w/2,
        h: 1,
        display: true,
        s: 1,
    }
    this.player.h = this.player.w * this.player.img.height / this.player.img.width;
    this.player.y -= this.player.h;

    // Text
    // this.text = [
    //     "Oh &@#$!",
    //     "I'm out of fuel!",
    //     "I better go find some..."
    // ]
    // this.textIndex = 0;
    // this.textTime = 90;
    // this.textTimer = this.textTime;
    // this.playertext = this.text[0];
    // this.displaytext = false;

    // stage
    this.stage = "landing"
}
leaveMars.draw = function(){
    this.display();
}
leaveMars.displayObject = function(obj){
    if(typeof obj.img.getHeight == "function"){
        drawAnimation(obj.img, obj.x+obj.w/2, obj.y+obj.h/2, obj.w, obj.h);
    } else {
        image(obj.img, obj.x, obj.y, obj.w, obj.h);
    }
}
leaveMars.display = function(){
    this.displayObject(this.background);
    this.displayObject(this.rock);
    this.displayObject(this.letter);
    this.displayObject(this.rocket);
    this.displayObject(this.ground);
}
