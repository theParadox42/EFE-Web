function buildSpaceLevel(){
    buildSpaceLevel.run();
}
buildSpaceLevel.init = function(){
    this.objects = currentBuildingLevel.objects;
    this.dock = {
        w: 200,
        h: height,
        p: 10
    }
    this.nm = height / 100

    this.loadObjects();
}
buildSpaceLevel.loadObjects = function(){
    FlyFreeplay.set(currentBuildingLevel, game.currentScene)
    FlyFreeplay.init();
}
buildSpaceLevel.runDock = function(){
    push();
    fill(50);
    rect(0, 0, this.dock.w, this.dock.h);



    pop();
}
buildSpaceLevel.display = function(){
    push();
    translate(this.dock.w, 0);

    FlyFreeplay(true);

    pop();

    this.runDock();
}
buildSpaceLevel.run = function(){
    this.display();
}
