function buildArena(){
    buildArena.run();
}
buildArena.init = function(){
    // Dock
    this.dock = {
        w: 100,
        h: 100,
        p: 10,
        items: [
            "pause",
            "edit",
            "switch"
        ]
    }
    this.dock.w *= this.dock.items.length;

    // Arranging the background
    this.background = {
        img: imgs.marsbackground,
        x: 0,
        y: 0,
    }
    this.background.aspect = this.background.img.width / this.background.img.height
    let canvasAspect = width / height;
    if(this.background.aspect > canvasAspect){
        this.background.h = height;
        this.background.w = this.background.h * this.background.aspect;
    } else {
        this.background.w = width;
        this.background.h = this.background.w * (1/this.background.aspect);
    }

    // Ground
    this.ground = {
        img: imgs.marsarena,
        x: width/2,
        y: height * 3/4,
        w: width * 7/8
    }

    // Block size
    buildArena.updateBlocks();
    this.bw = mGame.bw
    var sb = new MRock(0, 0, this.bw);
    this.bh = sb.h;

    // Multiplyers (big/small)
    this.bm = this.ground.w / mGame.ground.w;
    this.sm = 1/this.bm;

    // Placing
    this.mode = "rock";
}
buildArena.updateBlocks = function(){
    mGame.init(currentBuildingLevel.objects.blocks);
    this.rocks = mGame.rocks
}
buildArena.run = function(){
    this.display();
    this.displayObjects();

    this.runDock();

    if(clicked){
        this.placeObject();
    }
}
buildArena.placeObject = function(){
    currentBuildingLevel.verified = false;

    if(this.mode == "rock"){
        var x = constrain(map(mouseX, this.ground.x - this.ground.w/2, this.ground.x + this.ground.w/2, -100, 100), -100, 100);
        var y = max(0, map(mouseY, this.ground.y, this.ground.y - this.bh * this.bm, 0, 15));
        currentBuildingLevel.objects.blocks.push({
            x: x,
            y: y
        });
    } else {
        for(var i = this.rocks.length - 1; i > -1; i --){
            var rx = this.rocks[i].x;
            var ry = this.rocks[i].y;
            var rx2 = rx + this.rocks[i].w;
            var ry2 = ry + this.rocks[i].h;
            rx *= this.bm;
            ry *= this.bm;
            rx2 *= this.bm;
            ry2 *= this.bm;
            rx += this.ground.x;
            ry += this.ground.y;
            rx2 += this.ground.x;
            ry2 += this.ground.y;
            if(mouseX > rx && mouseX < rx2 && mouseY > ry && mouseY < ry2){
                currentBuildingLevel.objects.blocks.splice(i, 1);
            }
        }
    }

    this.updateBlocks();
}
buildArena.display = function(){
    image(this.background.img, 0, 0, this.background.w, this.background.h);
    image(this.ground.img, this.ground.x-this.ground.w/2, this.ground.y, this.ground.w, this.ground.w * this.ground.img.height / this.ground.img.width)
}
buildArena.displayObjects = function(){
    push();
    translate(this.ground.x, this.ground.y);
    scale(this.bm);
    for(var i = 0; i < this.rocks.length; i ++){
        this.rocks[i].display();
    }
    pop();
}
buildArena.runDock = function(){
    push();
    noStroke();
    fill(200, 150);
    rect(0, 0, this.dock.w, this.dock.h, this.dock.p);

    var ix = this.dock.p, iy = this.dock.p, iw = this.dock.w / this.dock.items.length - this.dock.p * 2, ih = this.dock.h - this.dock.p * 2

    for(var i = 0; i < this.dock.items.length; i ++){
        var di = this.dock.items[i];
        var imgKey = {
            "pause": "pausebtn",
            "edit": "editicon",
            "switch": this.mode == "rock" ? "marsrock" : "x"
        }
        if(typeof imgs[imgKey[di]] == "object"){
            image(imgs[imgKey[di]], ix, iy, iw, ih);
        }
        if(mouseX > ix && mouseX < ix + iw && mouseY > iy && mouseY < iy + ih){
            cursor(HAND);
            if(clicked){
                if(di == "switch"){
                    this.mode = this.mode == "rock" ? "x" : "rock";
                } else {
                    var funcKey = {
                        "pause": "pause",
                        "edit": "editStats"
                    }
                    if(typeof levelBuilder[funcKey[di]] == "function"){
                        levelBuilder[funcKey[di]]();
                    }
                }
            }
        }
        ix += this.dock.w / this.dock.items.length
    }

    if(mouseX < this.dock.w && mouseY < this.dock.h){
        pressed = false, clicked = false;
    }

    pop();
}
