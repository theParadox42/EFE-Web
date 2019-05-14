var imgs = {};
function drawAnimation(anim, x, y, w, h){
    push();
    translate(x, y);
    scale(w/anim.getWidth(), h/anim.getHeight());
    animation(anim, 0, 0);
    pop();
};
function preload(){
    console.log("loading")
    imgs.player = loadImage("/art/player.png");
    imga.cloudThumb = loadImage("/art/clouds0.png");
    imgs.cloud = loadAnimation("/art/clouds0.png", "/art/cloud4.png");
    imgs.cloud.frameDelay = 2;
    imgs.rocketOn = loadAnimation("/art/rocket1.png","/art/rocket6.png");
    imgs.rocketOn.frameDelay = 5;
    imgs.rocketOff = loadAnimation("/art/rocketoff0.png", "/art/rocketoff5.png");
    imga.rocketOff.frameDelay = 5;
    imgs.rocketThumb = loadImage("/art/rocket1.png");
    imgs.martian = loadImage("/art/martian.png");
    imgs.fueltank = loadImage("/art/fuel.png");
}
