let manOnTheMoon = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    run: function(){
        this.display();
    },
    display: function(){
        push();
        translate(this.x, this.y);
        imageMode(CENTER)
        image(imgs.manOnTheMoon[0], 0, 0, this.w, this.h);
        pop();
    },
    init: function(){
        this.x = width/2;
        this.y = height/2-225;
        this.w = (imgs.manOnTheMoon[0].width*(width/imgs.manOnTheMoon[0].width))/2;
        this.h = (imgs.manOnTheMoon[0].width*(width/imgs.manOnTheMoon[0].width))/2;
        console.log(this.w)
    }
}
