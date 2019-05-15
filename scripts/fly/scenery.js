//general scenery for both flying scenes
let stars = [];
function createStars(){
    for(var i = 0; i < 350; i++){
        stars.push({
            x: random(0, width),
            y: random(0, height),
            d: random(5,8),
            a: random(200, 255)
        })
    }
}
function drawStars(){
    push();
    noStroke();
    for(var i in stars){
        var s = stars[i];
        fill(255, 255, 255, s.a)
        ellipse(s.x, s.y, s.d, s.d);
    }
    pop();
}
