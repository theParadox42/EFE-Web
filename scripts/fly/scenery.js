//general scenery for both flying scenes
let stars = [];
function createStars(){
    for(var i = 0; i < 350; i++){
        stars.push({
            x: random(0, width),
            y: random(0, height),
        })
    }
}
function drawStars(){
    push();
    fill(249, 244, 244);
    noStroke();
    for(var i in stars){
        var s = stars[i];
        ellipse(s.x, s.y, 10, 10);
    }
    pop();
}
