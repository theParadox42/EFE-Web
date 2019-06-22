function fightMartians(){
    background(0);

    mGame.run();
}
fightMartians.init = function(rocks){
    mGame.init(rocks || mrocks);
}
