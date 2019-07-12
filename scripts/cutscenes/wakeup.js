function wakeUpScene(){
    wakeUpScene.draw();
}
wakeUpScene.draw = function(){
    background(255);
    this.update();

    push();

    // c is for camera
    translate(-this.c.tx, -this.c.ty);
    scale(this.c.s);

    image(this.roomimg, 0, 0, this.rw, this.rh);
    image(imgs[this.openMouth?"newsclosed":"newsopen"], this.tv.x, this.tv.y, this.tv.w, this.tv.h);

    if(this.player.isSleeping){
        push();
        translate(this.rw * 0.38, this.rh * 0.58);
        scale(-1, 1);
        rotate(90);
        var w = this.rw/5;
        image(imgs.player, 0, 0, this.player.w, this.player.h)
        pop();
    }else{
        push();
        translate(this.rw * 0.38, this.rh * 0.58);
        scale(-1, 1);
        var w = this.rw/5;
        image(imgs.player, this.player.x, 0, this.player.w, this.player.h);
        pop();
        if(this.player.runAway){
            this.player.x -= 8;
            if(this.player.x<-width) game.continue();
        }
    }

    pop();
    this.textBox.run();
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
    }


    switch(this.stage){
        case "zoom":
            var cameraSpeed = 0.05;
            this.c.tx = lerp(this.c.tx, this.tv.x+this.rw * 0.1, cameraSpeed);
            this.c.ty = lerp(this.c.ty, this.tv.y+this.rw * 0.05, cameraSpeed);
            this.c.s = lerp(this.c.s, 2, cameraSpeed);
            this.textBox.show = true;
        break;
        case "zoomout":
            var cameraSpeed = 0.05;
            this.c.tx = lerp(this.c.tx, 0, cameraSpeed);
            this.c.ty = lerp(this.c.ty, 0, cameraSpeed);
            this.c.s = lerp(this.c.s, 1, cameraSpeed);
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
                    wakeUpScene.player.isSleeping = false;
                    wakeUpScene.stage = "zoomout"
                }
                if(this.line < 8){
                    this.text = this.conversation[this.line];
                    this.textShowing = 0;
                } else {
                    this.show = false;
                    this.text = "";
                    wakeUpScene.player.runAway = true;
                }
            } else if(keysReleased[" "]||keysReleased[32]||clicked){
                this.textShowing = this.text.length;
            }
            // this.adjust();
            this.display();
            this.textShowing += 0.5;
        }
    },
    adjust: function(){
        if(this.line < 8){

        }
    },
    display: function(){
        push();
        fill(232);
        stroke(240);
        strokeWeight(5);
        rect(this.x, this.y, this.w, this.h);
        fill(0, 0, 0);
        textSize(15);
        stroke(255);
        strokeWeight(1);
        textFont(fonts.pixel);
        if(this.line<9){
            text(this.text.substr(0, this.textShowing), this.x+this.padding, this.y+this.padding, this.w-this.padding*2, this.h-this.padding*2);
        }
        if(this.line === 0&&this.textShowing>=this.text.length){
            text("Press space to continue", this.x+this.padding, this.y+this.h-20-this.padding*2);
        }
        pop();
    },
    init: function(){
        this.x = width/2-this.w/2;
        this.y = height-this.h-20;
        this.text = "";
        this.line = 0;
        this.show = false;
        this.textShowing = 0;
    }
}
wakeUpScene.textBox.conversation = [
    "Clint Stinkwood: Good afternoon ladies and gentlemen, I'm Clint Stinkwood and I'm here in Los Angeles, at The News Show studio, a few miles away from the launch site of the Savior space shuttle.",
    "Clint Stinkwood: We're just minutes away from the “All aboard” time, at which point the Savior will close all it's doors and prepare for launch.",
    "Clint Stinkwood: It's been a long and hard journey to get to this point, the human race is no longer capable of remaining here on earth with all of the toxic waste that has filled our streets and cities.",
    "Clint Stinkwood: After many years of trying to study and inventions, we are finally ready for the human race to make the epic journey to Mars on the Savior, where we will rebuild our civilization.",
    "Clint Stinkwood: It's time to say goodbye to our once beautiful and colorful planet earth, and make way for a new era of cleanliness and save living once again!",
    "Clint Stinkwood: I'm Clint Stinkwood on channel 953.673B, The News Show, and I'll see you next time on the planet Mars.",
    "PLEASE NOTE THAT ANYONE NOT ON THE SAVIOR BY THE ALL ABOARD TIME WILL BE LEFT BEHIND. IF YOU HAVE NOT YET ENTERED THE SHUTTLE, PLEASE GET YOU AND YOUR FAMILY MEMBERS ONTO IT AS SOON AS POSSIBLE.",
    "Tom: Oh @!%#!"
]
