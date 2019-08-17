function UfoCutscene(){
    UfoCutscene.draw();
}
UfoCutscene.init = function(){
    // Numbers & crap
    this.n = width / 1000;
    this.t = 0; //t = time

    // Object imgs & positions
    this.background = {
        img: imgs.stars,
        x: 0,
        y: 0,
        w: width,
        h: height
    };
    this.venus = {
        img: imgs.venus,
        x: width*2/3,
        y: height*2/3,
        w: width/4,
        h: width/4
    }

    this.ufo = {
        img: imgs.ufoboss,
        x: width/3 + this.n * 25,
        y: 0,
        w: width/3,
        init: function(){
            this.h = this.w * this.img.height / this.img.width;
            this.y -= this.h;
            this.x -= this.w/2;
        }
    };
    this.ufo.init();

    this.rocket = {
        img: imgs.rocketOn,
        r: 120,
        x: 0,
        y: 0,
        w: 100,
        init: function(){
            this.h = this.w * this.img.getHeight() / this.img.getWidth();
            this.y -= this.h/2;
            this.x -= this.h * 1.5;
        }
    };
    this.rocket.init();

    // Stage
    this.stage = "flyin-rocket";
}
UfoCutscene.update = function(){
    this.t ++;
    var r = this.rocket;
    var u = this.ufo;
    var updateRocket = _ => {
        var vx = sin(r.r) * this.n * 5;
        var vy = -cos(r.r) * this.n * 5;
        r.x += vx;
        r.y += vy;
    }
    switch(this.stage){
        case "flyin-rocket":
            updateRocket();
            if(r.x + r.w / 2 > width / 3){
                this.stage = "flyin-ufo";
            }
        break;
        case "flyin-ufo":
            updateRocket();
            var gY = height + u.h, gX = width / 2 - this.n * 25;
            var yT = u.y - gY, xT = u.x - gX;

            var dT = mag(yT, xT);
            var vx = xT, vy = yT;

            yT /= dT, xT /= dT;
            var mult = ((this.n * 10) / xT) / dT;

            vx *= mult;
            vy *= mult;
            u.x += vx;
            u.y += vy;

            if(u.y > height/3){
                r.r = lerp(r.r, -90, 0.1);
            }
            if(u.y > gY){
                this.stage = "flyout-rocket";
            }
        break;
        case "flyout-rocket":
            updateRocket();
            if(r.x < -r.h * 1.5){
                game.continue();
            }
        break;
    }
}
UfoCutscene.displayObject = function(obj){
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
UfoCutscene.display = function(){
    this.displayObject(this.background);
    this.displayObject(this.venus);
    this.displayObject(this.ufo);
    this.displayObject(this.rocket);
}
UfoCutscene.draw = function(){
    background(0);
    this.update();
    this.display();
}
