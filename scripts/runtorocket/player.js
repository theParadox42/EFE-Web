function Player(x, y){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
};
Player.prototype.init = function(){

};
Player.prototype.update = function(){

};
Player.prototype.display = function(){

};
Player.prototype.run = function(){
    this.update();
    this.display();
};
let player = new Player(0,0);
