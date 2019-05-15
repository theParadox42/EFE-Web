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
    imgs.player = loadImage("/art/earth/player.png");
    imgs.cloudThumb = loadImage("/art/cloud/cloud0.png");
    imgs.cloud = loadAnimation("/art/cloud/cloud0.png", "/art/cloud4.png");
    imgs.cloud.frameDelay = 2;
    imgs.rocketOn = loadAnimation("/art/rocket/rocketon/00.png","/art/rocket/rocketon/05.png");
    imgs.rocketOn.frameDelay = 5;
    imgs.rocketOff = loadAnimation("/art/rocket/rocketoff/00.png", "/art/rocket/rocketoff/05.png");
    imgs.rocketOff.frameDelay = 5;
    imgs.rocketThumb = loadImage("/art/rocket/rocketon/00.png");
    imgs.martian = loadImage("/art/mars/martian.png");
    imgs.fueltank = loadImage("/art/mars/fuel.png");
    imgs.asteroid = loadImage("/art/space/asteroid.png");
}
