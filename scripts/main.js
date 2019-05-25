
/*
 -=o= ESCAPE FROM EARTH =o=-
    Creators:
        theParadox42
        tannerderp
    All code is licenced under the GNU, see https://github.com/theParadox42/escape-from-earth/blob/master/LICENSE
    Or go to https://escapefromearth.tk/LICENSE for a download
*/

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
