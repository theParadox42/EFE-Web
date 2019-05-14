function Asteroid(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
}
Asteroid.prototype.run = function(p){
    this.display();
    this.collide(p);
}
Asteroid.prototype.collide = function(p){

}
Asteroid.prototype.display = function(){
    push();
    translate(this.x, this.y);
    scale(this.size);
    fill(255, 255, 255);
    noStroke();
    ellipse(0, 0, 10, 10);
    fill(0, 0, 0);
    textSize(1);
    textAlign(CENTER, CENTER);
    text("PLACEHOLDER", 0, 0);
    pop();
}
let asteroids = [];
asteroids.push(new Asteroid(400, 400, 20))
