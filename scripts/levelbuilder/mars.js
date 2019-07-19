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
            "edit"
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

    // Block size
    buildArena.updateBlocks();
    this.bw = mGame.bw
}
buildArena.updateBlocks = function(){
    mGame.init(currentBuildingLevel.objects.blocks);
    this.rocks = mGame.rocks
}
buildArena.run = function(){
    this.display();

    this.runDock();
}
buildArena.display = function(){
    image(imgs.marsbackground, 0, 0, this.background.w, this.background.h);
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
            "edit": "editicon"
        }
        if(typeof imgs[imgKey[di]] == "object"){
            image(imgs[imgKey[di]], ix, iy, iw, ih);
        }
        if(mouseX > ix && mouseX < ix + iw && mouseY > iy && mouseY < iy + ih){
            cursor(HAND);
            if(clicked){
                var funcKey = {
                    "pause": "pause",
                    "edit": "editStats"
                }
                if(typeof levelBuilder[funcKey[di]] == "function"){
                    levelBuilder[funcKey[di]]();
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
