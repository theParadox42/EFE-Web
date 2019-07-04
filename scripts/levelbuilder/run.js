function buildRunMap(){
    background(200, 225, 250);

    if(typeof currentBuildingLevel != "object") return levelBuilder.setType("none");
    if(typeof buildRunObjs.length != "number") buildRunMap.update();


    push();
    translate(runPlayer.transX, 0);

    runGround.display();

    for(var i = 0; i < buildRunObjs.length; i ++){
        var o = buildRunObjs[i];
        o.display();
    }

    push();
    stroke(0);
    strokeWeight(2);
    for(var i = 0; i < currentBuildingLevel.map.length + 1; i ++){
        line(i * runObstacleWidth, 0, i * runObstacleWidth, height);
    }
    pop();

    runPlayer.updateTranslate(true, currentBuildingLevel.map);

    buildRunMap.menu.runItems();
    if(clicked){
        buildRunMap.menu.handleClick();
    }

    pop();
}
var buildRunObjs = null;

buildRunMap.handleClick = function(){
}
buildRunMap.init = function(){
    this.carrying = "x";
    runPlayer.reset();
    runPlayer.x = 0;
    runGround.init();
    this.menu.init();
};
buildRunMap.menu = {
    carrying: "_",
    items: {},
    update: function(){
        buildRunObjs = [];
        var runmap = currentBuildingLevel.map;
        for(var i = 0; i < runmap.length; i ++){
            switch(runmap[i]){
                case "x":
                    buildRunObjs.push(new RunTrash(i * runObstacleWidth));
                break;
                case "c":
                    buildRunObjs.push(new RunCar(i * runObstacleWidth))
                break;
                case "^":
                    buildRunObjs.push(new RunSpike(i * runObstacleWidth))
                break;
                case "l":
                    buildRunObjs.push(new RunStreetLight(i * runObstacleWidth));
                break;
            }

        }

    },
    getDockDimensions: function(){
        var dockWidth = this.items.length * this.iconSize + this.items.length * this.padding,
        dockHeight = this.padding*2+this.iconSize,
        dx = width / 2 - dockWidth / 2,
        dy = this.padding;
        return {
            x: dx,
            y: dy,
            w: dockWidth,
            h: dockHeight
        }
    },
    runItems: function(){
        push();
        fill(255, 200);
        noStroke();
        var d = this.getDockDimensions();
        rect(d.x, d.y, d.w, d.h, this.padding);
        var j = 0;
        for(var i in this.items){
            if(i == "length") continue;
            var x = map(j, 0, this.items.length, d.x+this.padding, d.x+d.w-this.padding);
            image(this.items[i].img,x+(this.iconSize-this.items[i].w)/2, d.y+this.padding+(this.iconSize-this.items[i].h)/2, this.items[i].w, this.items[i].h);

            if(mouseX>x&&mouseX<x+this.iconSize&&mouseY>d.y+this.padding&&mouseY<d.y+d.h-this.padding){
                cursor(HAND);
                if(clicked){
                    clicked = false;
                    this.carrying = i;
                }
            }

            j ++;
        }
        pop();

        if(!(mouseX>d.x&&mouseX<d.x+d.w&&mouseY>d.y&&mouseY<d.y+d.h)){
            cursor(HAND);
            var itemCarrying = this.items[this.carrying];
            image(itemCarrying.img, mouseX-itemCarrying.w/2, mouseY-itemCarrying.h/2, itemCarrying.w, itemCarrying.h)
        }
    },
    handleClick: function(){
        this.placeBlock();
    },
    placeBlock: function(){
        var i = floor((mouseX-runPlayer.transX) / runObstacleWidth);
        if(i == currentBuildingLevel.map.length - 1) return;
        var mapArr = currentBuildingLevel.map.split("");
        if(mapArr[i] == "="){
            mapArr[i-1] = "_";
        } else if(mapArr[i] == "c"){
            mapArr[i+1] = "_";
        }
        mapArr[i] = this.carrying;
        if(this.carrying == "c"){
            mapArr[i+1] = "=";
        }
        currentBuildingLevel.map = mapArr.join("");

        this.update();
    },
    init: function(){
        this.padding = 20;
        this.iconSize = 80;
        this.update();

        // Image stuff
        var imgPairs = {
            "x": "trash",
            "^": "spike",
            "l": "streetlight",
            "c": "brokenCar",
            "_": "x"
        }
        this.items = {};
        this.items.length = 0;
        for(var i in imgPairs){

            this.items[i] = {
                img: imgs[imgPairs[i]],
            }
            if(this.items[i].img.width > this.items[i].img.height){
                this.items[i].w = this.iconSize;
                this.items[i].h = this.iconSize * this.items[i].img.height / this.items[i].img.width;
            } else {
                this.items[i].h = this.iconSize;
                this.items[i].w = this.iconSize * this.items[i].img.width / this.items[i].img.height;
            }
            this.items.length ++;
        }
    }
}
