function buildPlatformer(){
    background(200, 225, 250);
    push();
    translate(0, buildPlatformer.itemBarHeight);
    scale(buildPlatformer.scaleFactor);
    if(buildPlatformer.player) translate(buildPlatformer.player.getTransX());
    buildPlatformer.displayGrid();
    for(var i in buildPlatformer.blocks){
        buildPlatformer.blocks[i].display();
    }
    pop();
    buildPlatformer.itemBar();
    if(mouseY>buildPlatformer.itemBarHeight){
        buildPlatformer.displayItem();
    }
    if(clicked&&buildPlatformer.placing){
        buildPlatformer.placeItem();
        buildPlatformer.reload();
    }
}
buildPlatformer.init = function(){
    this.bw = 100;
    this.bh = 100;
    this.itemsKey = ["_", "a", "#", "r", "-", "'", "^", "~", "x", "o", "f", "%", "player","pause", "edit"];
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
        this.items[i].keyValue = this.itemsKey[i];
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
    this.reload();
}
buildPlatformer.reload = function(){
    this.blocks = [];
    var map = currentBuildingLevel.level;
    for(var i = 0; i < map.length; i ++){
        for(var j = 0; j < map[i].length; j ++){
            let k = map[i][j];
            let x = j * this.bw;
            let y = i * this.bh;
            if(bGame.getConst(k)){
                this.blocks.push(new (bGame.getConst(k))(x, y, this.bw, this.bh));
            } if(k == "@") {
                // this.player = new BPlayer(x, y+this.bh, this.bh*0.75);
                this.blocks.push(new BuildMenuButton("@", x, y, this.bw * 0.75, this.bw))
            }
        }
    }
}
buildPlatformer.placeItem = function(){
    var map = currentBuildingLevel.level;
    var my = (mouseY-this.itemBarHeight)/this.scaleFactor;
    var mx = mouseX/this.scaleFactor;
    if(mouseY<this.itemBarHeight) return;
    var x = floor(mx/this.bw);
    var y = floor(my/this.bh);
    if(this.placingItem == "@"){
        for(var i = 0; i < map.length; i ++){
            for(var j = 0; j < map[i].length; j ++){
                if(map[i][j] == "@"){
                    currentBuildingLevel.level[i] = currentBuildingLevel.level[i].replaceAt(j, "_");
                }
            }
        }
    }
    currentBuildingLevel.level[y] = currentBuildingLevel.level[y].replaceAt(x, this.placingItem);
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
        o.display(true);
        if(mouseX>o.x&&mouseX<o.x+o.w&&mouseY>o.y&&mouseY<o.y+o.h){
            cursor(HAND);
            if(clicked){
                if(o.notBlock){
                    switch(o.type){
                        case "pause":
                            levelBuilder.pause();
                        break;
                        case "edit":
                            levelBuilder.editStats();
                        break;
                        case "player":
                            this.placing = true;
                            this.placingItem = "@";
                        break;
                    }
                } else {
                    this.placing = true;
                    this.placingItem = this.itemsKey[i];
                }
                clicked = false;
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
            stroke(255, 64);
            strokeWeight(2);
            noFill();
            rectMode(LEFT);
            rect(x, y, this.bw, this.bh);
            pop();
        }
    }
}
buildPlatformer.displayItem = function(){
    if(this.placing){
        var o = this.items.find(function(a){
            return a.keyValue == buildPlatformer.placingItem || (a.keyValue == "player" && buildPlatformer.placingItem == "@");
        })
        var old = {
            x: o.x,
            y: o.y,
            w: o.w,
            h: o.h
        }

        var d = 100/o.h;
        o.w *= d;
        o.h *= d;
        o.x = mouseX - o.w / 2;
        o.y = mouseY - o.h / 2;
        o.display(true);

        for(var i in old){
            o[i] = old[i];
        }
    }
}

String.prototype.replaceAt=function(index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
}

function BuildMenuButton(type, x, y, w, bw){
    this.notBlock = true;
    this.x = x || 0;
    this.y = y || 0;
    this.type = type;
    this.img = {};
    switch(type){
        case "pause":
            this.img = imgs.pausebtn;
        break;
        case "edit":
            this.img = imgs.editicon;
        break;
        case "player":
            this.img = imgs.player;
        break;
        case "@":
            this.img = imgs.player;
        break;
        default:
            this.img = imgs.x;
        break;
    }
    if(type=="@" && typeof w == "number"){
        this.w = w;
        this.h = this.img.height / this.img.width * this.w;
        this.bw = bw;
    } else {
        this.w = w || 100;
        this.h = this.w;
    }
}
BuildMenuButton.prototype.display = function(){
    push();
    var tx = this.x+(this.w||this.bw)/2;
    translate(tx, 0);
    scale(-1, 1);
    translate(-tx, 0);
    imageMode(CORNER);
    let img = this.img;
    if(this.type == "@"){
        image(img, this.x, this.y+this.bw-this.h, this.w, this.h);
    } else if(this.type == "player"){
        var w = this.w * img.width / img.height;
        image(img, this.x + this.w / 2 - w / 2, this.y, w, this.h);
    } else {
        image(img, this.x, this.y, this.w, this.h);
    }
    pop();
}
