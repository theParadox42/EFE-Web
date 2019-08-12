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
    this.rocket.ch = this.rocket.h * 23 / 24;
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

    // Fuel
    this.fuels = [];

    // stage
    this.stage = "walkin"
}
leaveMars.draw = function(){
    this.update();
    this.display();
}
leaveMars.update = function(){
    switch(this.stage){
        case "walkin":
            this.player.x -= 5;
            var goToX = this.rocket.x + this.rocket.w*2;
            if(this.player.x <= goToX){
                this.player.x = goToX;
                this.stage = "throwfuel";
                this.fuelThrown = 0;
            }
        break;
        case "throwfuel":
            if(frameCount%20 == 0 && this.fuelThrown < 10){
                // Create a fuel
                var newFuel = {
                    img: imgs.fueltank,
                    x: this.player.x+this.player.w/2,
                    y: this.player.y+this.player.h/2,
                    w: this.player.w * 0.8,
                    vy: -this.player.h/20,
                    vx: -this.player.w/20
                }
                newFuel.h = newFuel.w * newFuel.img.height / newFuel.img.width;
                newFuel.y -= newFuel.h/2;
                newFuel.x -= newFuel.w/2;
                this.fuels.push(newFuel);
                this.fuelThrown ++;
            } else if(this.fuelThrown == 10 && this.fuels.length == 0){
                // Change scene
                this.stage = "goinrocket";
            }
            // Update fuel
            for(var i = this.fuels.length - 1; i > -1; i --){
                var fuel = this.fuels[i];
                fuel.vy += 0.39;
                fuel.x += fuel.vx;
                fuel.y += fuel.vy;
                if(fuel.x + fuel.w / 2 < this.rocket.x + this.rocket.w / 2){
                    this.fuels.splice(i, 1);
                }
            }
        break;
        case "goinrocket":
            this.player.x -= 5;
            if(this.player.x + this.player.w / 2 < this.rocket.x + this.rocket.w / 2){
                this.player.display = false;
                this.stage = "launch";
                this.rocket.img = imgs.rocketOn
            }
        break;
        case "launch":
            this.rocket.y -= 20;
            if(this.rocket.y < -this.rocket.h * 2){
                game.continue();
            }
        break;
    }
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
    for(var i = 0; i < this.fuels.length; i ++){
        this.displayObject(this.fuels[i]);
    }
    if(this.player.display){
        push();
        translate(this.player.x + this.player.w / 2, this.player.y);

        scale(this.player.s, 1);

        image(this.player.img, -this.player.w / 2, 0, this.player.w, this.player.h);

        pop();
    }
    this.displayObject(this.rocket);
    this.displayObject(this.ground);
}
