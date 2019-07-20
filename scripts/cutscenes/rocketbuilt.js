function RocketBuilt(){
    RocketBuilt.draw();
}
RocketBuilt.init = function(){

    // Ground
    this.ground = {
        y: height*5/6
    }

    // Scenery
    this.buildings = [];
    for(var i = -100; i < width+100; i += 90){
        var h = random(height / 2, height * 3 / 4);
        var img = imgs.buildings[~~random(imgs.buildings.length)]
        var newBuilding = {
            img: img,
            x: i + random(50),
            y: this.ground.y - h,
            h: h,
            w: h * img.width / img.height
        }
        this.buildings.push(newBuilding);
    }
    this.buildings.sort(function(a, b){
        return a.h - b.h;
    });

    // player
    this.player = {
        x: -100,
        y: this.ground.y + 30,
        w: 80,
        h: 0,
        img: imgs.player,
        showing: true
    }
    this.player.h = this.player.w * this.player.img.height / this.player.img.width;
    this.player.y -= this.player.h;

    // Pieces
    this.pieces = [
        {
            x: width/2 - 15,
            y: -100,
            w: 100,
            img: imgs.rocketfin,
            falling: true,
            landY: this.ground.y + 10
        },
        {
            x: width/2 + 30,
            y: -500,
            w: 100,
            img: imgs.rocketengine.images[0],
            falling: true,
            landY: this.ground.y + 25
        },
        {
            x: width/2 + 15,
            y: -200,
            w: 100,
            img: imgs.rockettail,
            falling: true,
            landY: this.ground.y + 50
        },
    ]
    for(var i = 0; i < this.pieces.length; i ++){
        var piece = this.pieces[i];
        piece.h = piece.w * piece.img.height / piece.img.width
    }

    // light
    this.light = {
        x: width/2,
        y: height/2,
        w: width/100,
        h: height/100,
        a: 255,
        on: false,
    }

    // rocket
    this.rocket = {
        img: imgs.rocketOff,
        built: false,
        x: width/2,
        y: this.ground.y + 70,
        w: 250,
        countdown: 20,
    }
    this.rocket.h = this.rocket.w * this.rocket.img.getHeight() / this.rocket.img.getWidth()
    this.rocket.y -= this.rocket.h;

    // stage
    this.stage = "enter"
}
RocketBuilt.draw = function(){
    this.update();
    this.display();
}
RocketBuilt.update = function(){
    switch(this.stage){
        case "enter":
            this.player.x += 5;
            if(this.player.x > width/3){
                this.stage = "pieces";
            }
        break;
        case "pieces":
            var onGround = true;
            for(var i = 0; i < this.pieces.length; i ++){
                var piece = this.pieces[i];
                if(piece.falling){
                    piece.y += 15;
                    if(piece.y + piece.h > piece.landY){
                        piece.falling = false;
                        piece.y = piece.landY - piece.h;
                    }
                    onGround = false;
                }
            }
            if(onGround){
                this.stage = "light";
                this.light.on = true;
            }
        break;
        case "light":
            if(this.light.w > width * 4){
                this.light.w = width * 3;
                this.light.h = height * 3;
                this.light.a = 254;
                this.pieces = [];
                this.rocket.built = true;
            } else if(this.light.a == 255){
                this.light.w *= 1.1;
                this.light.h *= 1.1;
            } else if(this.light.a <= 0){
                this.stage = "board"
            } else {
                this.light.a -= 5;
            }
        break;
        case "board":
            if(this.player.x + this.player.w/2 < this.rocket.x + this.rocket.w/2){
                this.player.x += 5;
            } else {
                this.stage = "takeoff"
                this.rocket.img = imgs.rocketOn;2
                this.player.showing = false;
            }
        break;
        case "takeoff":
            if(this.rocket.countdown > 0){
                this.rocket.countdown --;
            } else if(this.rocket.y < -height){
                game.continue();
            } else {
                this.rocket.y -= 20;
            }
        break;
    }
}
RocketBuilt.display = function(){
    background(100, 200, 255);

    push();
    noStroke();
    fill(100, 120, 120, 100);
    for(var i = 0; i < this.buildings.length; i ++){
        var b = this.buildings[i]
        if(i/5 == round(i/5)){
            rect(0, 0, width, height);
        }
        image(b.img, b.x, b.y, b.w, b.h);
    }
    rect(0, 0, width, height);
    fill(0, 80, 0);
    rect(0, this.ground.y, width, height-this.ground.y)
    pop();

    if(this.player.showing){
        push();
        translate(this.player.x+this.player.w/2, this.player.y);
        scale(-1, 1);
        image(this.player.img, -this.player.w, 0, this.player.w, this.player.h);
        pop();
    }

    for(var i = 0; i < this.pieces.length; i ++){
        var piece = this.pieces[i];
        image(piece.img, piece.x, piece.y, piece.w, piece.h);
    }

    if(this.rocket.built){
        drawAnimation(this.rocket.img, this.rocket.x+this.rocket.w/2, this.rocket.y+this.rocket.h/2, this.rocket.w, this.rocket.h);
    }

    if(this.light.on){
        push();
        noStroke();
        fill(255, this.light.a);
        ellipse(this.light.x, this.light.y, this.light.w, this.light.h);
        pop();
    }
}
