function buildSpaceLevel(){
    buildSpaceLevel.run();
}
buildSpaceLevel.init = function(){
    this.objects = currentBuildingLevel.objects;
    this.dock = {
        w: 200,
        h: height,
        p: 10,
        items: [
            "asteroids",
            "ufos",
            "boss",
            "x",
            "pause",
            "edit",
            "left",
            "right"
        ]
    }
    this.nm = height / 100

    this.loadObjects();

    this.carrying = "asteroids";
    this.carryingsize = 25;

    this.tx = 0;
}
buildSpaceLevel.loadObjects = function(){
    flyPlayer = new FlyPlayer(50, height/2);
    flyPlayer.init();

    this.w = this.objects.width * this.nm
    loadDynamicLevel(this.objects);
}
buildSpaceLevel.runDock = function(){
    push();
    fill(50, 200);
    rect(0, 0, this.dock.w, this.dock.h);

    var y = this.dock.p;
    var ih = height/this.dock.items.length - this.dock.p * 2;
    var iw = this.dock.w - this.dock.p * 2
    var ia = iw / ih;
    noStroke();
    for(var i = 0; i < this.dock.items.length; i ++){
        var img = null;
        switch(this.dock.items[i]){
            case "asteroids":
                img = imgs.asteroid;
            break;
            case "ufos":
                img = imgs.ufo.getFrameImage(0);
            break;
            case "boss":
                img = imgs.ufoboss;
            break;
            case "x":
                img = imgs.x;
            break;
            case "pause":
                img = imgs.pausebtn;
            break;
            case "edit":
                img = imgs.editicon;
            break;
            case "left":
                img = imgs.leftarrow;
            break;
            case "right":
                img = imgs.rightarrow;
            break;
        }

        if(img){
            var imw = img.width;
            var imh = img.height;
            var ima = img.width / img.height;
            if(ima < ia){
                imw *= ih / imh;
                imh = ih;
                image(img, this.dock.p + iw/2-imw/2, y, imw, imh);
            } else {
                imh *= iw / imw;
                imw = iw;
                image(img, this.dock.p + iw/2-imw/2, y, imw, imh);
            }
        }

        if(mouseX > this.dock.p && mouseX < this.dock.p + iw && mouseY > y && mouseY < y + ih){
            cursor(HAND);
            if(clicked){
                clicked = false;
                var di = this.dock.items[i];
                if(di == "asteroids" || di == "ufos" || di == "boss" || di == "x"){
                    this.carrying = di;
                } else {
                    switch(di){
                        case "pause":
                            levelBuilder.pause();
                        break;
                        case "edit":
                            levelBuilder.editStats();
                        break;
                    }
                }
            } else if(mouseIsPressed){
                switch(this.dock.items[i]){
                    case "left":
                        this.tx -= 30;
                    break;
                    case "rigth":
                        this.tx += 30;
                    break;
                }
            }
        }

        y += ih+this.dock.p * 2;
    }

    pop();

    if(keys[LEFT_ARROW]||keys.a){
        this.tx -= 30;
    } if(keys[RIGHT_ARROW]||keys.d){
        this.tx += 30;
    }

    if(clicked){
        if(mouseX<this.dock.w){
            clicked = false
        }
    }
}
buildSpaceLevel.displayObjects = function(){
    push();
    background(0, 0, 0);
    this.transX = 0;
    var levelW = this.w;
    if(flyPlayer.x>0&&flyPlayer.x<levelW){
        this.transX = -flyPlayer.x;
    }else if(flyPlayer.x>levelW){
        this.transX = -levelW
    }

    translate(this.transX, 0);
    displayStars();

    for(var i = 0; i < asteroids.length; i ++){
        asteroids[i].display();
    }
    for(var i = 0; i < ufos.length; i ++){
        ufos[i].display();
    }
    for(var i = 0; i < bosses.length; i ++){
        bosses[i].display();
    }

    pop();

}
buildSpaceLevel.display = function(){
    push();
    translate(this.dock.w, 0);

    this.displayObjects();

    pop();

    this.displayHoldingObject();

}
buildSpaceLevel.displayHoldingObject = function(){
    if(mouseX>this.dock.w){
        if(clicked){
            this.placeObject();
        }
        var w = this.carryingsize * this.nm
        var i;
        switch(this.carrying){
            case "asteroids":
                i = imgs.asteroid
            break;
            case "ufos":
                i = imgs.ufo.getFrameImage(0);
            break;
            case "boss":
                i = imgs.ufoboss;
            break;
            case "x":
                i = imgs.x;
            break;
        }
        if(i){
            push();
            imageMode(CENTER);
            image(i, mouseX, mouseY, w, w * i.height / i.width)
            pop();
        }
    }

}
buildSpaceLevel.run = function(){
    this.display();

    this.runDock();

    this.tx = constrain(this.tx, 0, this.w-width+this.dock.w)
    flyPlayer.x = this.tx;
}
buildSpaceLevel.placeObject = function(){
    if(this.objects[this.carrying] && this.objects[this.carrying] instanceof Array){
        var mx = mouseX - this.dock.w - this.transX;
        var my = mouseY;
        var xv = mx / height * 100;
        var yv = my / height * 100;
        this.objects[this.carrying].push([
            xv, yv,
            this.carryingsize
        ])
    } else if(this.carrying == "x"){
        for(var i in this.objects){
            if(typeof this.objects[i] == "object" && this.objects[i] instanceof Array){
                for(var j = this.objects[i].length - 1; j > -1; j --){
                    var o = this.objects[i][j];
                    var x = o[0] * this.nm;
                    var y = o[1] * this.nm;
                    var r = o[2] * this.nm || 100;
                    if(dist(mouseX, mouseY, x+this.dock.w, y) < r){
                        this.objects[i].splice(j, 1);
                    }
                }
            }
        }
    }
    this.loadObjects();
}
