function AtLaunchPad(){
    AtLaunchPad.draw();
}
AtLaunchPad.draw = function(){

    this.update();

    background(200, 225, 255);
    push();
    translate(width/2, 0);

    push();
    noStroke();
    fill(0, 150, 20);
    // this just makes it more responsive
    var gh = 50+height/5.7; // grass height
    rect(-width/2-1, height-gh, width+2, gh+1);
    fill(0, 50);
    //shadow radius
    var sr = this.rocket.w*((this.rocket.y+2000)/(this.rocket.oy+2000));
    sr = max(sr, 0);
    ellipse(this.rocket.x, this.rocket.oy-this.rocket.h/50, sr, sr/5)
    pop();

    if(this.rocket.on){
        var flameW = this.rocket.w / 2;
        drawAnimation(imgs.rocketflame, this.rocket.x, this.rocket.y-this.rocket.h/6, flameW, flameW * imgs.rocketflame.getHeight() / imgs.rocketflame.getWidth())
    }
    image(imgs.largerocket, this.rocket.x-this.rocket.w/2, this.rocket.y-this.rocket.h, this.rocket.w, this.rocket.h)

    pop();
}
AtLaunchPad.update = function(){
    if(this.rocket.on){
        this.rocket.y -= 10;
    }

    if(this.stage = )
}
AtLaunchPad.init = function(){
    this.stage = "run"

    this.rocket = {
        x: 0,
        y: height-100,
        w: height/4,
        h: height/1.3,
        on: false,
    }
    this.rocket.oy = this.rocket.y;
    this.rocket.w = this.rocket.h * imgs.largerocket.width / imgs.largerocket.height
}
