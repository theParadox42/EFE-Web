let moonPlayer = {
    x: -500,
    y: -500,
    w: 40,
    h: 0,
    direction: "right",
    wait: 0,
    run: function(){
        this.display();
        if(this.appeared){
            this.wait ++;
            if(this.wait>30){
                this.direction = "left";
            }
            if(this.wait>60){
                this.direction = "right";
            }
            if(this.wait>80){
                manOnTheMoon.appear = true;
            }
        }
    },
    display: function(){
        push();
        translate(this.x+this.w/2,this.y);

        if (this.direction === "right") scale(-1, 1);
        image(this.img, -this.w/2, 0, this.w, this.h);

        pop();
    },
    appear: function(){
        this.x = moonShip.x;
        this.y = moonShip.y-30;
        this.appeared = true;
    },
    init: function(){
        this.img = imgs.player;
        this.h = this.w*this.img.height/this.img.width;
    }
}
