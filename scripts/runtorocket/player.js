function RunPlayer(x, y){
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = this.w;
    this.vx = 0;
    this.vy = 0;
};
RunPlayer.prototype.init = function(){
    this.img = imgs.player;
    this.h = this.w*this.img.height/this.img.width;
    console.log("!")
};
RunPlayer.prototype.update = function(){

};
RunPlayer.prototype.display = function(){
    push();
    translate(this.x+this.w/2,this.y-this.h);
    if (this.vx>0) scale(-1, 1);
    if(this.img){
        image(this.img, -this.w/2, 0, this.w, this.h);
    }
    pop();
};
RunPlayer.prototype.run = function(){
    this.update();
    this.display();
};
let runPlayer = new RunPlayer(100,100);
