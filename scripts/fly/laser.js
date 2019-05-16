function Laser(x, y, r, speed){
  this.x = x;
  this.y = y;
  this.r = r;
  this.radius = 10;
  this.speed = speed;
  this.dead = false;
}
Laser.prototype.run = function(){
  this.display();
  this.update();
}
Laser.prototype.update = function(){
  this.x += this.speed*sin(this.r);
  this.y -= this.speed*cos(this.r);
}
Laser.prototype.display = function(){
  stroke(201, 34, 34);
  push();
  strokeWeight(this.radius);
  translate(this.x, this.y);
  rotate(this.r);
  line(0, 0, 0, this.radius);
  pop();
}
let lasers = [];
