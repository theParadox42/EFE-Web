let keys = {}, keysReleased = {}
var clicked = false, pressed = false, canPress = true;
function keyPressed(){
    keys[key] = true;
    keys[keyCode] = true;
};
function keyReleased(){
    keys[key] = false;
    keys[keyCode] = false;
    keysReleased[key] = true;
    keysReleased[keyCode] = true;
};
function mousePressed(){
    if(canPress){
        pressed = true;
        canPress = false;
    }
};
function mouseReleased(){
    canPress = true;
    clicked = true;
};
function resetInput(){
    keysReleased = {};
    clicked = false;
    pressed = false;
}
