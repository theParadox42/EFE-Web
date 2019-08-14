function loadSpecial(){
    loadAnimation()
    //Explosion
    imgs.explosion = Array(11);
    let addedZero = "0"
    for(var i = 0; i<imgs.explosion.length; i++){
        if(i > 9){
            addedZero = "";
        }
        imgs.explosion[i] = loadImage("/imgs/space/explosion/"+addedZero+i+".png");
    }
    //buildings
    imgs.buildings = Array(7);
    for(var i = 0; i < imgs.buildings.length; i ++){
        imgs.buildings[i] = loadImage("/imgs/earth/buildings/0" + i + ".png");
    }
    // Player walking animation
    imgs.players = Array(5);
    for(var i = 0; i < imgs.players.length; i ++){
        var n = i;
        if(i == 0){
            n = "";
        }
        imgs.players[i] = loadImage("/imgs/earth/player/player"+n+".png");
    }
    // imgs.spacesign = loadAnimation("/imgs/space/sign/00.png", "/imgs/space/sign/01.png")
}


function drawAnimation(anim, x, y, w, h){
    if(!anim){
        return console.warn("No animation provided")
    }
    push();
    translate(x, y);
    scale(w / anim.getWidth(), h / anim.getHeight());
    animation(anim, 0, 0);
    pop();
};
