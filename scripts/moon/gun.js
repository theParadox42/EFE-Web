let moonGun = {
    appear: false,
    x: 0,
    y: 0,
    run: function(){
        if(this.appear){
            this.display();
            let p = moonPlayer;
            if(this.x>p.x+p.w/4){
                this.x -= 3;
            }
            if(this.y<p.y+p.h/2){
                this.y += 3;
            }
        }
    },
    display: function(){
        push();
        translate(this.x, this.y);
        scale(0.025)
        image(imgs.moonGun, 0, 0);
        pop();
    },
    init: function(){
        this.x = manOnTheMoon.x;
        this.y = height/2;
    }
}
