
/*
 -=o= ESCAPE FROM EARTH =o=-
    Creators:
        theParadox42
        Tannerderp
    All code is licenced under the GNU, see https://github.com/theParadox42/escape-from-earth/blob/master/LICENSE
*/

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);
    angleMode(DEGREES);
    game.init();
};
function draw(){
    game.run();
    // image(imgs.cloud, 0, 0);
};
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}
