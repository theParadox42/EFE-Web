function wakeUpScene(){
    wakeUpScene.draw();
}
wakeUpScene.draw = function(){
    background(255);
    this.update();

    push();

    // c is for camera
    scale(1 / this.c.s);
    translate(-this.c.tx, -this.c.ty);

    image(this.roomimg, 0, 0, this.rw, this.rh);
    image(imgs[this.openMouth ? "newsclosed" : "newsopen"], this.tv.x, this.tv.y, this.tv.w, this.tv.h);

    if (this.player.isSleeping) {
        push();
        translate(this.player.tx, this.player.y);
        scale(-1, 1);
        rotate(90);
        var w = this.rw/5;
        image(imgs.player, 0, 0, this.player.w, this.player.h)
        pop();
    } else {
        push();
        translate(this.player.tx, this.player.y);
        scale(-1, 1);
        var w = this.rw/5;
        image(imgs.player, this.player.x, 0, this.player.w, this.player.h);
        fill(0, 50);
        noStroke();
        ellipse(this.player.x+this.player.w * 0.45, this.player.h*0.99, this.player.w, this.player.w / 4)
        pop();
    }
    this.textBox.run();

    pop();
}
wakeUpScene.update = function(){
    this.time ++;
    this.mouthDelay --;
    if(this.mouthDelay <= 0){
        this.openMouth = !this.openMouth;
        this.mouthDelay += random(30, 80);
    }

    if(this.time > 30 && this.stage == "sleep"){
        this.stage = "zoom";
        this.c.t = 0;
    }

    if(this.player.runAway){
        this.player.x -= 8;
        if(this.player.x<-width) game.continue();
    }

    switch(this.stage){
        case "zoom":
            var cameraSpeed = 0.05;
            var go = {
                x: this.tv.x-width*0.1,
                y: this.tv.y-width*0.05,
                s: 3
            }
            go.s = 1 / go.s
            this.c.t ++;
            if(this.c.t < 100){
                this.c.tx = lerp(this.c.tx, go.x, cameraSpeed);
                this.c.ty = lerp(this.c.ty, go.y, cameraSpeed);
                this.c.s = lerp(this.c.s, go.s, cameraSpeed);
            } else {
                this.stage = "subtitles";
            }
        break;
        case "subtitles":
            this.textBox.show = true;
            this.c.t = 0;
        break;
        case "zoomout":
            this.textBox.show = false;
            this.c.t ++;
            if(this.c.t < 100){
                var cameraSpeed = 0.05;
                this.c.tx = lerp(this.c.tx, 0, cameraSpeed);
                this.c.ty = lerp(this.c.ty, 0, cameraSpeed);
                this.c.s = lerp(this.c.s, 1, cameraSpeed);
            } else {
                this.stage = "###";
                this.textBox.show = true;
                this.player.isSleeping = false;
                this.player.y = this.rh * 0.52
                this.player.x -= this.player.w;
            }
        break;
        case "###":
            if(!this.textBox.show){
                this.stage = "player";
            }
        break;
        case "player":
            this.textBox.show = false;
            this.player.runAway = true;
        break;
    }
}
wakeUpScene.init = function(){
    this.time = 0;
    this.stage = "sleep"

    this.roomimg = imgs.homeroom

    var ri = this.roomimg;
    var ia = ri.width / ri.height; // image aspect
    var ca = width / height; // canvas aspect
    if(ia < ca){
        this.rw = width;
        this.rh = width / ia;
    } else {
        this.rh = height;
        this.rw = this.rh * ia;
    }

    var rp = { // Room Pixels
        w: 170,
        h: 100,
        tv: {
            x: 74,
            y: 44,
            w: 22,
            h: 12
        }
    }
    var ptp = this.rw / rp.w; // pixel to pixel
    this.tv = {
        x: ptp * rp.tv.x,
        y: ptp * rp.tv.y,
        w: ptp * rp.tv.w,
        h: ptp * rp.tv.h
    }
    this.player = {
        tx: this.rw * 0.38,
        x: 0,
        y: this.rh * 0.58,
        w: this.rw / 15,
        isSleeping: true
    }
    this.player.h = this.player.w * imgs.player.height / imgs.player.width;

    this.openMouth = false;
    this.mouthDelay = 50;

    this.c = { // camera
        tx: 0,
        ty: 0,
        s: 1,
    }
    this.textBox.init();
    this.textBox.x = width/2-this.textBox.w/2;
    this.textBox.y = 25;
    this.player.x = 0;
}
wakeUpScene.textBox = {
    x: 0,
    y: 0,
    w: 400,
    h: 200,
    padding: 10,
    text: "",
    textShowing: 0,
    line: 0,
    show: false,
    run: function(){
        if(this.show === true){
            if(this.textShowing>=this.text.length&&(keysReleased[" "]||keysReleased[32]||clicked)){
                this.line ++;
                if(this.line == 7){
                    this.parent.stage = "zoomout"
                }
                if(this.line < 8){
                    this.text = this.conversation[this.line];
                    this.textShowing = 0;
                } else if(this.parent.stage == "###"){
                    this.show = false;
                    this.text = "";
                }
            } else if(keysReleased[" "]||keysReleased[32]||clicked){
                this.textShowing = this.text.length;
            }
            this.adjust();
            this.display();
            this.textShowing += 0.5;
        }
    },
    adjust: function(){
        var parent = this.parent;
        if(parent.stage == "subtitles"){
            this.x = parent.tv.x-1;
            this.y = parent.tv.y-1;
            this.w = parent.tv.w+2;
            this.h = parent.tv.h+2;
            this.ts = 8;
            this.bg = color(0, 200);
            this.st = color(0, 0);
            this.tc = color(255, 200);
            this.tst = color(0, 0);
        } else if(parent.stage == "###"){
            this.w = 300;
            this.h = 50;
            this.x = parent.player.tx - parent.player.x - this.w/2 - parent.player.w/2;
            this.y = parent.player.y-this.h-this.padding;
            this.ts = 20;
            this.bg = null;
            this.st = null;
            this.tc = null;
            this.tst = null;
        }
    },
    display: function(){
        push();
        fill(this.bg || 232);
        stroke(this.st || 255);
        strokeWeight(5);
        rect(this.x, this.y, this.w, this.h);
        fill(this.tc || 0);
        stroke(this.tst || 255);
        strokeWeight(1);
        textFont(fonts.pixel);
        textSize(this.ts || 15);
        if(this.line<9){
            text(this.text.substr(0, this.textShowing), this.x+this.padding, this.y+this.padding, this.w-this.padding*2, this.h-this.padding*2);
        }
        if(this.line === 0&&this.textShowing>=this.text.length){
            text("Press space to continue", this.x+this.padding, this.y+this.h-this.padding);
        }
        pop();
    },
    init: function(){
        this.parent = wakeUpScene;
        this.x = width/2-this.w/2;
        this.y = height-this.h-20;
        this.line = 0;
        this.text = this.conversation[this.line];
        this.show = false;
        this.textShowing = 0;
    }
}
wakeUpScene.textBox.conversation = [
    "Clint Stinkwood: Good afternoon ladies and gentlemen, I'm Clint Stinkwood and I'm here in Los Angeles, at The News Show studio, a few miles away from the launch site of the Savior space shuttle.",
    "Clint Stinkwood: We're just minutes away from the \"All aboard\" time, at which point the Savior will close all it's doors and prepare for launch.",
    "Clint Stinkwood: It's been a long and hard journey to get to this point, the human race is no longer capable of remaining here on earth with all of the toxic waste that has filled our streets and cities.",
    "Clint Stinkwood: After many years of trying to study and inventions, we are finally ready for the human race to make the epic journey to Mars on the Savior, where we will rebuild our civilization.",
    "Clint Stinkwood: It's time to say goodbye to our once beautiful and colorful planet earth, and make way for a new era of cleanliness and save living once again!",
    "Clint Stinkwood: I'm Clint Stinkwood on channel 953.673B, The News Show, and I'll see you next time on the planet Mars.",
    "PLEASE NOTE THAT ANYONE NOT ON THE SAVIOR BY THE ALL ABOARD TIME WILL BE LEFT BEHIND. IF YOU HAVE NOT YET ENTERED THE SHUTTLE, PLEASE GET YOU AND YOUR FAMILY MEMBERS ONTO IT AS SOON AS POSSIBLE.",
    "Tom: Oh @!%#! I gotta go!"
]
