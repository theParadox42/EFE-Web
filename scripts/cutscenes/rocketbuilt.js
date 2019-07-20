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
        img: imgs.player
    }
    this.player.h = this.player.w * this.player.img.height / this.player.img.width;
    this.player.y -= this.player.h;

    //
    this.stage = "enter"
}
RocketBuilt.draw = function(){
    this.update();
    this.display();
}
RocketBuilt.update = function(){
    switch(this.stage){
        case "enter":
            this.player.x +=5;
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

    push();
    translate(this.player.x+this.player.w/2, this.player.y);
    scale(-1, 1);
    image(this.player.img, -this.player.w, 0, this.player.w, this.player.h);
    pop();
}
