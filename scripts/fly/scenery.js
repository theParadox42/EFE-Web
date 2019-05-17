//general scenery for both flying scenes
let stars = [];
function displayStars(){
    for(var i = 0; i < 7000; i += imgs.stars.width*(height/imgs.stars.height)){
        push();
        translate(i, 0);
        scale(height/imgs.stars.height);
        image(imgs.stars, 0, 0);
        pop();
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
