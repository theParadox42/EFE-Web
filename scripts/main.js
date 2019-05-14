
/*
 -=o= ESCAPE FROM EARTH =o=-
    Creators:
        theParadox42
        Tannerderp
    All code is licenced under the GNU, see https://github.com/theParadox42/escape-from-earth/blob/master/LICENSE
*/

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(200);
    game.init();
};
function draw(){
    game.run();
};
