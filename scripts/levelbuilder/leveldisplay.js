function LevelDisplay(level, w, h){
    this.level = level;
    this.x = 0;
    this.y = 0;
    this.w = w;
    this.h = h;
}
LevelDisplay.prototype.go = function(){
    playLevel.setup(this.level)
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
    fill(255, 0, 0);
    strokeWeight(5);
    stroke(0);
    rect(this.x, this.y, this.w, this.h, 10);
    console.log(this.y);
    pop();
}
LevelDisplay.prototype.draw = function(x, y){
    this.x = x;
    this.y = y;
    this.check();
    this.display();
}
var levelDisplays = [];
