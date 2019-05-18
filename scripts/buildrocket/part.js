let BPart = [];
BPart[0] = function(){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}
BPart[0].prototype.run = function(){

}
BPart[1] = function(){
    BPart[0].call(this);
}
BPart[1].prototype = Object.create(BPart[0].prototype);
BPart[2] = function(){

}
BPart[2].prototype = Object.create(BPart[0].prototype);
