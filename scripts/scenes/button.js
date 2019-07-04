function Button(text, x, y, w, h, func){
    this.text = text;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.func = typeof func == "function" ? func : function(){
        console.log("Placeholder function for button with text "+this.text)
    };
}
Button.prototype.check = function(){
    if(mouseX>this.x&&mouseY>this.y&&mouseX<this.x+this.w&&mouseY<this.y+this.h){
        cursor(HAND);
        if(pressed){
            pressed = false;
        } if(clicked){
            clicked = false;
            this.func();
        }
    }
}
Button.prototype.display = function(textColor, textStroke){
    push();
    //Rect
    rect(this.x, this.y, this.w, this.h, 5);
    //Text
    if(textStroke){
        strokeWeight(2);
        stroke(textStroke);
    } else {
        noStroke();
    }
    if(textColor){
        fill(textColor);
    } else {
        fill(255);
    }
    textAlign(CENTER, CENTER);
    text(this.text, this.x+this.w/2, this.y+this.h/2);
    pop();
}
Button.prototype.draw = function(textColor, textStroke){
    this.check();
    this.display(textColor, textStroke);
}
