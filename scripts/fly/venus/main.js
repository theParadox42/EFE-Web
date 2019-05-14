function flyToVenus(){
    background(0,0,0);
    drawStars();
    flyPlayer.run();
}
flyToVenus.init = function(){
    createStars();
}
