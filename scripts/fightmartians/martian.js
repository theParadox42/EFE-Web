function Martian(x, y, w){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.img = imgs.martian;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
}
Martian.prototype.collide = function(p) {

};
Martian.prototype.update = function() {

};
Martian.prototype.display = function() {
    push()

    translate(this.x+this.w/2, this.y);
    if(this.vx >= 0) scale(-1, 1);

    image(this.image, -this.w/2, 0, this.w, this.h);

    pop();
};
Martian.prototype.run = function() {
    this.collide(p);
    this.update();
    this.display();
};
