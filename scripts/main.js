var theEpicCanvas;
function setup(){
    windowHeight -= 30;
    theEpicCanvas = createCanvas(windowWidth, windowHeight);

    background(255);
    angleMode(DEGREES);
    game.init();
};
function draw(){

    cursor("default");

    game.run();
};
