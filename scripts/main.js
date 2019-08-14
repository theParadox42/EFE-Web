
function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);
    angleMode(DEGREES);
    game.init();
};
function draw(){
    cursor("default");

    game.run();
};
function windowResized(){
    // resizeCanvas(windowWidth, windowHeight);
    // game.resize();
}
