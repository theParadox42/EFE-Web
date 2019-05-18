
/*
 -=o= ESCAPE FROM EARTH =o=-
    Creators:
        theParadox42
        Tannerderp
    All code is licenced under the GNU, see https://github.com/theParadox42/escape-from-earth/blob/master/LICENSE
    Or go to https://escapefromearth.tk/LICENSE to download
*/

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);
    angleMode(DEGREES);
    game.init();
};
function draw(){
    game.run();
};
function windowResized(){
    // window.location.reload();
    resizeCanvas(windowWidth, windowHeight, true);
    width = windowWidth;
    height = windowHeight;
    game.resize();
}
