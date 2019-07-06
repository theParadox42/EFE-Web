function buildPlatformer(){
    background(200, 225, 250);
    buildPlatformer.itemBar();
    push();
    scale(this.scaleFactor);
    if(this.player) translate(this.player.getTransX());
    buildPlatformer.displayGrid();
    for(var i in buildPlatformer.blocks){
        buildPlatformer.blocks[i].display();
    }
    pop();
    if(clicked&&buildPlatformer.placing){
        buildPlatformer.placeItem();
        buildPlatformer.reload();
    }
}
buildPlatformer.init = function(){
    this.bw = 100;
    this.bh = 100;
    this.itemsKey = ["a", "#", "r", "-", "'", "^", "~", "x", "o", "f", "%"];
    this.items = Array(this.itemsKey.length);
    this.load();
    for(var i in this.itemsKey){
        this.items[i] = new (bGame.getConst(this.itemsKey[i]))(0, 0);
        this.items[i].w = width/this.items.length;
        this.items[i].h = this.items[i].w;
    }
    this.itemSpace = (this.items.length*100);
    console.log(this.items[0].w)
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
                this.blocks.push(new (bGame.getConst(k))(x*this.scaleFactor, y*this.scaleFactor, this.bw, this.bh));
            } if(k == "@") {
                this.player = new BPlayer(x, y+this.bh, this.bh*0.75);
            }
        }
    }
}
String.prototype.replaceAt=function(index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
}
buildPlatformer.placeItem = function(){
    var map = currentBuildingLevel.level;
    for(var i in map){
        for(var j in map[i]){
            let k = map[i][j];
            let x = j * this.bw;
            let y = i * this.bh;
            if(mouseX*this.scaleFactor>x&&mouseX*this.scaleFactor<x+this.bw&&mouseY*this.scaleFactor>y&&mouseY*this.scaleFactor<y+this.bh){
                currentBuildingLevel.level[i] = currentBuildingLevel.level[i].replaceAt(j, this.placingItem);
            }
        }
    }
}
buildPlatformer.itemBar = function(){
    push();
    fill(41, 41, 41, 100);
    noStroke();
    rect(0, 0, width, this.items[0].h);
    var x = 0;
    for(var i in this.items){
        var o = this.items[i];
        var x = map(i, 0, this.items.length, 0, width);
        push();
        translate(x, 0);
        var img = o.img;
        if(Array.isArray(img.images)) img = img.images[0];
        image(img, 0, 0, o.w, o.h);
        pop();
        if(mouseX>x&&mouseX<x+o.w&&mouseY>0&&mouseY<this.items[0].h){
            cursor(HAND);
            if(clicked){
                this.placing = true;
                this.placingItem = this.itemsKey[i];
            }
        }
    }
    pop();
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
