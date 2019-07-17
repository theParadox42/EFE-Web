function buildSpaceLevel(){
    buildSpaceLevel.run();
}
buildSpaceLevel.init = function(){
    this.objects = currentBuildingLevel.objects;
    this.dock = {
        w: 100,
        h: height,
        p: 10
    }
}
buildSpaceLevel.runDock = function(){

}
buildSpaceLevel.display = function(){
    background(0);

    push();
    this.runDock();
    translate(this.dock.w, 0);

    for(var i = 0; i < this.objects.asteroids.length; i ++){
        var a = this.objects.asteroids[i];
        ellipse(a[0] / 100)
    }
    for(var i = 0; i < this.objects.ufos.length; i ++){
        var u = this.objects.ufos[i];
    }
    for(var i = 0; i < this.objects.boss.length; i ++){
        var b = this.objects.boss[i];
    }

    pop();
}
buildSpaceLevel.run = function(){
    this.display();
}
