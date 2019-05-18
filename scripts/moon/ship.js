let moonShip = {
    x: 0,
    y: 0,
    w: 100,
    h: 40,
    moving: true,
    offImgs: {},
    onImg: {},
    playerWait: 0,
    run: function(){
        if(this.y<height/2+150){
            this.y += 3;
        } else{
            this.moving = false;
            this.playerWait ++;
            if(this.playerWait>40){
                moonPlayer.appear();
            }
        }
        this.display();
    },
    init: function(){
        this.x = width/2-200;
        this.y = -50;
        this.offImg = imgs.rocketOff;
        this.onImg = imgs.rocketOn;
        this.h = this.w * this.onImg.getHeight() / this.onImg.getWidth();
    },
    display: function(){
        push();
        imageMode(CENTER); //rotate from center
        translate(this.x, this.y);
        if(this.moving){
            drawAnimation(this.onImg, 0, 0, this.w, this.h);
        } else {
            drawAnimation(this.offImg, 0, 0, this.w, this.h);
        }
        pop();
    }
}
