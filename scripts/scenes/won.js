function Won(){
    // Starry background w/ rocket
    background(0);
    image(imgs.stars, 0, 0, width, height);
    push();
    translate(200, 200);
    rotate(-45);
    let imgw = 200;
    drawAnimation(imgs.rocketOn,0,0,imgw,imgw*imgs.rocketOn.height/imgs.rocketOn.width)
    pop();
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);

    //
}
Won.init = function(){
    Won.menu = new Button();
}
