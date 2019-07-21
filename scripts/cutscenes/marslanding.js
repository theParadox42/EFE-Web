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
        img: imgs.letter,
        x: width/2,
        y: this.ground.y-20,
        w: 20,
        h: 20
    }
    this.rock = {
        img: imgs.marsrock,
        x: this.letter.x-15,
        y: this.ground.y,
        w: this.letter.w + 20,
        h: 1
    }
    this.rock.h = this.rock.w * this.rock.img.height / this.rock.img.width;
    this.rock.y -= this.rock.h;
}
marsLanding.draw = function(){
    this.update();
    this.display();
}
marsLanding.update = function(){
    this.stage = "landing"
}
marsLanding.displayObject = function(obj){
    image(obj.img, obj.x, obj.y, obj.w, obj.h);
}
marsLanding.display = function(){
    this.displayObject(this.background);
    this.displayObject(this.ground);
    this.displayObject(this.rock);
    this.displayObject(this.letter);
}
