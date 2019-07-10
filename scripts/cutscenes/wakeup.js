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
    }

    pop();
}
wakeUpScene.update = function(){
    this.time ++;
    this.mouthDelay --;
    if(this.mouthDelay <= 0){
        this.openMouth = !this.openMouth;
        this.mouthDelay += random(30, 80);
    }

    if(this.time > 100){
        this.stage = "zoom";
    }


    switch(this.stage){
        case "zoom":
            var cameraSpeed = 0.05;
            this.c.tx = lerp(this.c.tx, this.tv.x-this.rw * 0.2, cameraSpeed);
            this.c.ty = lerp(this.c.ty, this.tv.y-this.rw * 0.1, cameraSpeed);
            this.c.s = lerp(this.c.s, 1.5, cameraSpeed);
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
}
