let imgs = {};
let fonts = {};
function drawAnimation(anim, x, y, w, h){
    push();
    translate(x, y);
    scale(w/anim.getWidth(), h/anim.getHeight());
    animation(anim, 0, 0);
    pop();
};
function preload(){
    //Font
    fonts.pixel = loadFont("/fonts/pixelfont.ttf");
    //Player
    imgs.player = loadImage("/art/earth/simpleplayer.png");// I switched this to simple because the quality is better
    //Cloud
    imgs.cloud = loadAnimation("/art/cloud/00.png", "/art/cloud/04.png");
    imgs.cloud.frameDelay = 2;
    //Rocket On
    imgs.rocketOn = loadAnimation("/art/rocket/rocketon/00.png","/art/rocket/rocketon/05.png");
    imgs.rocketOn.frameDelay = 5;
    //Rocket Off
    imgs.rocketOff = loadAnimation("/art/rocket/rocketoff/00.png", "/art/rocket/rocketoff/05.png");
    imgs.rocketOff.frameDelay = 5;
    //Martian
    imgs.martian = loadImage("/art/mars/martian.png");
    // Fuel
    imgs.fueltank = loadImage("/art/mars/fuel.png");
    //Asteroid
    imgs.asteroid = loadImage("/art/space/asteroid.png");
    //stars
    imgs.stars = loadImage("/art/space/stars.png"); //thats right, I finally did pixel art
    //explosion
    imgs.explosion = Array(11);
    let addedZero = "0"
    for(var i = 0; i<imgs.explosion.length; i++){
        if(i > 9){
            addedZero = "";
        }
        imgs.explosion[i] = loadImage("art/space/explosion/"+addedZero+i+".png");
    }
    //Spike
    imgs.spike = loadImage("/art/earth/spike.png");
    // Broken Car
    imgs.brokenCar = loadImage("/art/earth/brokencar.png");
    // Trash
    imgs.trash = loadImage("/art/earth/trash.png");
    // Streetlight
    imgs.streetlight = loadImage("/art/earth/streetlight.png");
    // buildings
    imgs.buildings = Array(5); // maybe 6
    for(var i = 0; i < imgs.buildings.length; i ++){
        imgs.buildings[i] = loadImage("/art/earth/buildings/0" + i + ".png");
    }
}
