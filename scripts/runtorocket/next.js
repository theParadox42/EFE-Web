function RunNext(x){
    this.x = x;
}
RunNext.prototype.collide = function(p){
    if(p.x>this.x){
        p.transX = this.x;
    }
}
RunNext.prototype.run = function(p){
    this.collide(p);
}
