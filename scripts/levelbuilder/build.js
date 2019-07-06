function buildPlatformer(){
    background(200, 225, 250);
    buildPlatformer.itemBar();
    push();
    translate(0, buildPlatformer.itemBarHeight);
    scale(buildPlatformer.scaleFactor);
    if(buildPlatformer.player) translate(buildPlatformer.player.getTransX());
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
    this.itemsKey = ["a", "#", "r", "-", "'", "^", "~", "x", "o", "f", "%", "pause", "edit"];
    this.items = Array(this.itemsKey.length);
    this.itemPadding = width/100;//padding
    this.iw = width/this.items.length - this.itemPadding*2;
    for(var i in this.itemsKey){
        var constr = bGame.getConst(this.itemsKey[i])
        if(constr){
            this.items[i] = new (constr)(0, 0);
        } else {
            this.items[i] = new BuildMenuButton(this.itemsKey[i]);
        }
        this.items[i].w = this.iw;
        this.items[i].h = this.iw;
    }
    this.itemSpace = (this.items.length*100);
    this.itemBarHeight = width/this.items.length;
    this.load();
}
buildPlatformer.load = function(){
    var map = currentBuildingLevel.level;
    this.scaleFactor = (height-this.itemBarHeight)/(map.length*this.bh);
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
                this.blocks.push(new (bGame.getConst(k))(x, y, this.bw, this.bh));
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
    rect(0, 0, width, this.itemBarHeight);
    var x = 0;
    for(var i in this.items){
        var o = this.items[i];
        var x = map(i, 0, this.items.length, 0, width);
        o.x = x+this.itemPadding;
        o.y = this.itemPadding;
        o.display();
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
            var x = j*this.bw;
            var y = i*this.bh;
            push();
            stroke(0, 0, 0);
            strokeWeight(0.5);
            noFill();
            rectMode(LEFT);
            rect(x, y, this.bw, this.bh);
            pop();
        }
    }
}


function BuildMenuButton(type){
    this.notBlock = true;
    this.x = 0;
    this.y = 0;
    this.w = 100;
    this.h = 100;
    this.img = {};
    switch(type){
        case "pause":
            this.img = imgs.pausebtn;
        break;
        case "edit":
            this.img = imgs.editicon;
        break;
    }
}
BuildMenuButton.prototype.display = function(){
    push();
    imageMode(CORNER);
    image(this.img, this.x, this.y, this.w, this.h);
    pop();
}
