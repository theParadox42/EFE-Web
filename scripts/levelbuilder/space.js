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
    for(var i = 0; i < this.dock.items.length; i ++){
        rect(this.dock.p, y, this.dock.w - this.dock.p * 2, ih)
        var img = null;
        switch(this.dock.items[i]){
            case "asteroids":
                img = imgs.asteroid;
            break;
            case "ufos":
                img = imgs.ufo.getFrame(0);
            break;
            case "boss":
                img = imgs.ufoboss;
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
            image(img, this.dock.p, y, this.dock.w-this.dock.p * 2, ih);
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

    for(var i = ufos.length-1; i>-1; i--){
        ufos[i].run();
        if(ufos[i].dead&&ufos[i].frame>20){
            ufos.splice(i, 1);
        }
    }
    for(var i in lasers){
      lasers[i].run();
      if(lasers[i].dead){
          lasers.splice(i, 1);
      }
    }
    for(var i in asteroids){
        asteroids[i].run();
        if(asteroids[i].dead&&asteroids[i].frame>20){
            asteroids.splice(i, 1);
        }
    }

    fill(255, 0, 0);
    ellipse(this.w, height/2, 50, 50);

    pop();

}
buildSpaceLevel.display = function(){
    push();
    translate(this.dock.w, 0);

    this.displayObjects();

    pop();

}
buildSpaceLevel.run = function(){
    this.display();

    this.runDock();
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
                i = imgs.ufo.getFrame(0);
            break;
            case "boss":
                i = imgs.ufoboss;
            break;
        }
        if(i){
            push();
            imageMode(CENTER);
            console.log(w);
            image(i, mouseX, mouseY, w, w * i.height / i.width)
            pop();
        }
    }

    this.tx = constrain(this.tx, 0, this.w-width+this.dock.w)
    flyPlayer.x = this.tx;
}
buildSpaceLevel.placeObject = function(){
    if(this.objects[this.carrying] && this.objects[this.carrying] instanceof Array){
        var mx = mouseX - this.dock.w - this.transX;
        var my = mouseY;
        var xv = mx / height * 100;
        var yv = my / height * 100;
        console.log()
        this.objects[this.carrying].push([
            xv, yv,
            this.carryingsize
        ])
    } else {
        console.log(this.objects[this.carrying] +", "+this.carrying)
    }
    this.loadObjects();
}
