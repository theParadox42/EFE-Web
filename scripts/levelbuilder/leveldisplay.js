function LevelDisplay(level, w, h, editable){
    this.level = level;
    this.x = 0;
    this.y = 0;
    this.w = w;
    this.h = h;
    this.editable = editable;
}
LevelDisplay.prototype.go = function(){
    playLevel.setup(this.level, game.currentScene)
    game.setScene("playlevel");
}
LevelDisplay.prototype.check = function(){
    if(this.editable){
        if(mouseX>this.x+10&&mouseX<this.x+this.w-10){
            if(mouseY>max(this.y+this.w+50+scroller.ay, 100)&&mouseY<this.y+this.h-10+scroller.ay){
                cursor(HAND);
                if(clicked){
                    if(mouseX<this.x+this.w/2){
                        this.go();
                    } else {
                        levelBuilder.openLevel(this.level.index);
                    }
                }
                pressed = false, clicked = false;
            }
        }
        return;
    }
    if(mouseX>this.x&&mouseX<this.x+this.w&&mouseY>max(100, this.y+scroller.ay)&&mouseY<this.y+scroller.ay+this.h){
        cursor(HAND);
        if(pressed){
            this.go();
            pressed = false;
        } else if(clicked){
            clicked = false;
        }
    }
}
LevelDisplay.prototype.display = function(){
    push();
    var img;
    switch(this.level.type){
        case "run":
            img = imgs.runthumb;
        break;
        case "build":
            img = imgs.buildthumb;
        break;
        case "space":
            img = imgs.spacethumb;
        break;
        case "mars":
            img = imgs.marsthumb;
        break;
        default:
            img = imgs.x;
        break;
    }
    image(img, this.x, this.y, this.w, this.w);

    fill(0);
    textAlign(LEFT, TOP);
    textFont(fonts.londrina);
    textSize(15);
    text(this.level.title+"\n"+this.level.creator, this.x+5, this.y+this.w+5, this.w-10, this.h-this.w-10);

    if(this.editable){
        push();
        fill(245);
        strokeWeight(5);
        stroke(10);
        rect(this.x+10, this.y+this.w+50, this.w/2-15, this.h-(this.w+60), 5)
        rect(this.x+this.w/2+5, this.y+this.w+50, this.w/2-15, this.h-(this.w+60), 5)
        fill(10);
        noStroke();
        textFont(fonts.londrina);
        textSize(12);
        textAlign(CENTER, CENTER);
        text("Play", this.x+5+this.w/4, this.y+this.h-30)
        text("Edit", this.x-5+this.w*3/4, this.y+this.h-30)
        pop();
    }

    strokeWeight(5);
    noFill();
    stroke(0);
    rect(this.x, this.y, this.w, this.h, 8);

    pop();
}
LevelDisplay.prototype.draw = function(x, y){
    this.x = x;
    this.y = y;
    this.check();
    this.display();
}
var communityDisplays = [],
    levelBuildDisplays = [];
