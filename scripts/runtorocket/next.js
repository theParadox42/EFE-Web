function RunNext(x){
    this.x = x;
}
RunNext.prototype.collide = function(p){
    if(p.x>this.x){
        p.controlTrans = false;
        if(p.x > this.x+width){
            loadRun.next();
        }
    }
}
RunNext.prototype.run = function(p){
    this.collide(p);
}
