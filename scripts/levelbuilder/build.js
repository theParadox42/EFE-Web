function buildPlatformer(){
    background(200, 225, 250);
    push();
    scale(this.scaleFactor);
    if(this.player) translate(this.player.getTransX());
    buildPlatformer.displayGrid();
    pop();
}
buildPlatformer.init = function(){
    this.bw = 100;
    this.bh = 100;
    this.load();
}
buildPlatformer.load = function(){
    var map = currentBuildingLevel.level;
    this.scaleFactor = height/map.length/this.bh;
    this.h = map.length * this.bh;
    this.w = map[0].length * this.bw;
    this.sw = 1/this.scaleFactor * width;
    this.sh = 1/this.scaleFactor * height;
    console.log(this.scaleFactor);
    this.reload();
}
buildPlatformer.reload = function(){
    this.blocks = [];
    var map = currentBuildingLevel.level;
    for(var i = 0; i < map.length; i ++){
        for(var j = 0; j < map[i].length; j ++){
            let k = map[i][j];
            // if(k == "*"){
            //     k += maps[this.level].item; I don't know what this is all about
            //     this.canPass = false;
            // }
            let x = j * this.bw;
            let y = i * this.bh;
            if(bGame.getConst(k)){
                this.blocks.push(new (this.getConst(k))(x, y, this.bw, this.bh));
            } if(k == "@") {
                this.player = new BPlayer(x, y+this.bh, this.bh*0.75);
            }
        }
    }
}
buildPlatformer.displayGrid = function(){
    var map = currentBuildingLevel.level;
    for(var i in map){
        for(var j in map[i]){
            var x = j*this.bw*this.scaleFactor;
            var y = i*this.bh*this.scaleFactor;
            push();
            stroke(0, 0, 0);
            strokeWeight(0.5);
            fill(0, 0, 0, 0);
            rectMode(LEFT);
            rect(x, y, this.bw*this.scaleFactor, this.bh*this.scaleFactor);
            pop();
        }
    }
}
