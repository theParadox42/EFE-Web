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
            return console.warn("Not valid type");
        break;
    }
    image(img, this.x, this.y, this.w, this.w);

    fill(0);
    textAlign(LEFT, TOP);
    textFont(fonts.londrina);
    textSize(15);
    text(this.level.title+"\n"+this.level.creator, this.x+5, this.y+this.w+5, this.w-10, this.h-this.w-10);

    strokeWeight(5);
    noFill();
    stroke(0);
    rect(this.x, this.y, this.w, this.h, 2);

    

    pop();
}
LevelDisplay.prototype.draw = function(x, y){
    this.x = x;
    this.y = y;
    this.check();
    this.display();
}
var communityDisplays = [];
