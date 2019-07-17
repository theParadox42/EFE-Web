function AtLaunchPad(){
    AtLaunchPad.draw();
}
AtLaunchPad.draw = function(){

    this.update();

    background(200, 225, 255);

    for(var i = 0; i < this.buildings.length; i ++){
        var b = this.buildings[i]
        image(b.img, b.x, b.y, b.w, b.h);
    }

    push();
    translate(width/2, 0);

    push();
    noStroke();
    fill(0, 150, 20);
    // this just makes it more responsive
    rect(-width/2-1, height-this.gh, width+2, this.gh+1);
    fill(0, 50);
    //shadow radius
    var sr = this.rocket.w*((this.rocket.y+700)/(this.rocket.oy+700));
    sr = max(sr, 0);
    ellipse(this.rocket.x, this.rocket.oy-this.rocket.h/50, sr, sr/5)
    ellipse(this.player.x+this.player.w/2, this.player.y+this.player.h, this.player.w, this.player.w/5);
    pop();

    if(this.rocket.on){
        var flameW = this.rocket.w / 2;
        drawAnimation(imgs.rocketflame, this.rocket.x, this.rocket.y-this.rocket.h/6, flameW, flameW * imgs.rocketflame.getHeight() / imgs.rocketflame.getWidth())
    }
    image(imgs.largerocket, this.rocket.x-this.rocket.w/2, this.rocket.y-this.rocket.h, this.rocket.w, this.rocket.h)

    push();
    translate(this.player.x, this.player.y)
    scale(-1, 1);
    image(imgs.player, -this.player.w, 0, this.player.w, this.player.h);
    pop();

    if(this.player.talking){
        push();
        fill(255);
        stroke(230);
        strokeWeight(5);
        textSize(30);
        textFont(fonts.pixel);
        var tw = textWidth(this.player.text) + 15, th = 50;
        rect(this.player.x + this.player.w / 2 - tw / 2, this.player.y-th-15, tw, th)
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(this.player.text, this.player.x+this.player.w/2, this.player.y-th/2-15)
        pop();
    }

    pop();
}
AtLaunchPad.update = function(){
    if(this.rocket.on){
        this.rocket.y -= 20;
    }

    switch(this.stage){
        case "runin":
            if(this.player.x < -width/6){
                this.player.x += 5;
                this.timedelay = 0;
            } else if(this.timedelay < 50){
                this.timedelay ++;
                this.rocket.x = noise(frameCount/12.7)*50-25
            } else {
                this.timedelay = 0;
                this.stage = "takeoff";
                this.rocket.on = true;
            }
        break;
        case "takeoff":
            this.rocket.x = noise(frameCount/12.7)*50-25
            if(this.rocket.y < - 1000){
                this.stage = "idea";
                this.rocket.on = false;
                this.player.talking = true;
                this.timeDelay = 0;
            }
        break;
        case "idea":
            if(this.timeDelay<80){
                this.timeDelay++;
            } else {
                this.player.ti++;
                this.timeDelay = 0;
                if(this.player.ti >= this.player.texts.length){
                    this.stage = "runout";
                    this.player.talking = false;
                } else {
                    this.player.text = this.player.texts[this.player.ti];
                }
            }
        break;
        case "runout":
            this.player.x += 8
            if(this.player.x > width * 6/5){
                game.continue();
            }
        break;
    }
}
AtLaunchPad.init = function(){
    // Basic
    this.stage = "runin"
    this.timeDelay = 0;
    this.gh = 50+height/5.7; // grass height

    // Rocket
    this.rocket = {
        x: 0,
        y: height-100,
        w: height/4,
        h: height/1.3,
        on: false,
    }
    this.rocket.oy = this.rocket.y;
    this.rocket.w = this.rocket.h * imgs.largerocket.width / imgs.largerocket.height

    // Player
    this.player = {
        x: -width/2-100,
        y: height-150,
        h: 100,
        texts: [
            "Oh NO!",
            "They just left!",
            "But wait...",
            "I bet they left enough stuff to build...",
            "I bet they left enough stuff to build...",// So it lasts longer
            "My own rocket!",
            "I must go collect the parts"
        ],
        text: "Oh No!",
        ti: 0
    }
    this.player.w = this.player.h * imgs.player.width / imgs.player.height;

    // Scenery
    this.buildings = [];
    for(var i = -100; i < width+100; i += 80){
        var h = random(height / 2, height * 3 / 4);
        var img = imgs.buildings[~~random(imgs.buildings.length)]
        var newBuilding = {
            img: img,
            x: i + random(50),
            y: height - h,
            h: h,
            w: h * img.width / img.height
        }
        this.buildings.push(newBuilding);
    }
    this.buildings.sort(function(a, b){
        return a.h - b.h;
    });
}





//
