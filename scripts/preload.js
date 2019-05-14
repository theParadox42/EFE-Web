var imgs = {};

function preload(){
    console.log("loading")
    imgs.player = loadImage("/art/player.png");
    // imgs.cloud = loadGif("/art/clouds.gif");
    imgs.minirocket = loadAnimation("/art/rocket1.png","/art/rocket6.png");
    imgs.minirocket1 = loadImage("/art/rocket1.png");
    imgs.martian = loadImage("/art/martian.png");
    imgs.fueltank = loadImage("/art/fuel.png");
}
