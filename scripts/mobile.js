function mobileControl(x, y, w, h, keysKey, txt){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.key = keysKey;
    this.txt = txt;
}
mobileControl.prototype.update = function(){
    if(mouseX>this.x&&mouseX<this.x+this.w&&mouseY>this.y&&mouseY<this.y+this.h){
        if(mouseIsPressed){
            mouseIsPressed = false;
        }
        if(pressed){
            keysReleased[this.key] = true;
            pressed = false;
        } if(clicked){
            clicked = false;
        }
    }
    keys[this.key] = false;
    for(var i = 0; i < touches.length; i ++){
        let tx = touches[i].x;
        let ty = touches[i].y;
        if(tx>this.x&&tx<this.x+this.w&&ty>this.y&&ty<this.y+this.h){
            keys[this.key] = true;
            break;
        }
    }
};
mobileControl.prototype.display = function(){
    push();
    translate(this.x, this.y);

    fill(0, 0, 0, 128);
    stroke(0, 0, 0, 200);
    strokeWeight(5);

    rect(0, 0, this.w, this.h);

    fill(255, 255, 255, 128);
    textAlign(CENTER, CENTER);
    textFont(fonts.pixel);
    textSize(20);
    text(this.txt, this.w/2, this.h/2);

    pop();
};
let mobileControls = [];
function createMobileControls(){
    let cw = 80;
    let ch = cw;
    let p = 10;
    let p2 = 2 * p;
    let p3 = 3 * p;
    function cmc(x, y, k, t, x2){
        let nw = cw;
        if(x2){
            nw = abs(x2-x);
        }
        mobileControls.push(new mobileControl(x, y, nw, ch, k, t));
    }
    cmc(p, height-ch-p, LEFT_ARROW, "<");
    cmc(p2+cw, height-ch-p, DOWN_ARROW, "v");
    cmc(p2+cw, height-ch*2-p2, UP_ARROW, "^");
    cmc(p3+cw*2, height-ch-p, RIGHT_ARROW, ">");
    cmc(width-cw-p, height-ch-p, "x", "X");
    cmc(width-cw*2-p2, height-ch-p, "z", "Z");
    cmc(p2*2+cw*3, height-ch-p, 32, "Space", width-cw*2-p3);
};
function updateMobile(){
    for(var i = 0; i < mobileControls.length; i ++){
        mobileControls[i].update();
    }
}
function displayMobile(){
    for(var i = 0; i < mobileControls.length; i ++){
        mobileControls[i].display();
    }
};
var isMobile = (function(){
    return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);
}());
