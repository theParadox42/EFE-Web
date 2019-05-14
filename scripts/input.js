let keys = {};
function keyPressed(){
    keys[key] = true;
    keys[keyCode] = true;
}
function keyReleased(){
    keys[key] = false;
    keys[keyCode] = false;
}
