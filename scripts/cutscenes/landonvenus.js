function LandOnVenus(){
    LandOnVenus.draw();
}
LandOnVenus.init = function(){
    this.background = {
        img: imgs.stars,
        x: 0,
        y: 0,
        w: width,
        h: height
    };
    this.venus = {
        img: imgs.venus,
        x: height*3/4,
        y: height*3/4,
        w: height/2,
        h: height/2
    };
    this.rocket = {
        img: imgs.rocketOn,
        x: 0,
        y: 0,
        r: 135,
        w: 150,
        init: function(){
            this.h = this.w * this.img.getHeight() / this.img.getWidth();
            this.x -= this.h * 2;
            this.y -= this.h * 2;
        }
    };
    this.rocket.init();
}
LandOnVenus.update = function(){
    var nw = this.rocket.w / 150;
    this.rocket.x += 5;
    this.rocket.y += 5;
    var ns = 0.99;
    this.rocket.w *= ns;
    this.rocket.h *= ns;
}
LandOnVenus.displayObject = function(obj){
    push();
    translate(obj.x + obj.w/2, obj.y + obj.h/2);
    if(typeof obj.r == "number") rotate(obj.r);
    if(typeof obj.img.getHeight == "function"){
        drawAnimation(obj.img, 0, 0, obj.w, obj.h);
    } else {
        image(obj.img, -obj.w/2, -obj.h/2, obj.w, obj.h);
    }
    pop();
}
LandOnVenus.display = function(){
    this.displayObject(this.background);
    this.displayObject(this.venus);
    this.displayObject(this.rocket);
}
LandOnVenus.draw = function(){
    background(0);
    this.update();
    this.display();
}
