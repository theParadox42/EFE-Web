function Laser(x, y, r, speed){
  this.x = x;
  this.y = y;
  this.r = r;
  this.speed = speed
}
Laser.prototype.run = function(){
  this.display();
  this.update();
  this.collide();
}
Laser.prototype.collide = function(){
  for(var i in asteroids){
    //do collisions
  }
}
Laser.prototype.update = function(){
  this.x += this.speed*sin(this.r);
  this.y -= this.speed*cos(this.r);
}
Laser.prototype.display = function(){
  stroke(201, 34, 34);
  push();
  strokeWeight(10);
  translate(this.x, this.y);
  rotate(this.r);
  line(0, 0, 0, 10);
  pop();
}
let lasers = [];
