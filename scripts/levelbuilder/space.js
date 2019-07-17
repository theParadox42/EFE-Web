function buildSpaceLevel(){
    buildSpaceLevel.run();
}
buildSpaceLevel.init = function(){
    this.objects = currentBuildingLevel.objects;
}
buildSpaceLevel.display = function(){
    background(0);

    for(var i = 0; i < this.objects.asteroids.length; i ++){
        var a = this.objects.asteroids[i];
    }
    for(var i = 0; i < this.objects.ufos.length; i ++){
        var u = this.objects.ufos[i];
    }
    for(var i = 0; i < this.objects.boss.length; i ++){
        var b = this.objects.boss[i];
    }
}
buildSpaceLevel.run = function(){
}
