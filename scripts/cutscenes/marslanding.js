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

    // letter
    this.letter = {
        x: width/2,
        y: 
    }
    this.rock = {

    }
}
marsLanding.draw = function(){
    this.update();
    this.display();
}
marsLanding.update = function(){
    this.stage = "landing"
}
marsLanding.display = function(){
    image(this.background.img, this.background.x, this.background.y, this.background.w, this.background.h);
    image(this.ground.img, this.ground.x, this.ground.y, this.ground.w, this.ground.h);
}
