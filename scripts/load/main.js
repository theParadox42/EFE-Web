let imgs = {}, fonts = {};

function loadFiles(){
    fileLoader.run();
}
loadFiles.init = function(){
    fileLoader.loadAll();
}
let fileLoader = {
    loaded: 0,
    loadProgress: 0,
    needed: 0,
    neededTypes: 0,
    loadIndex: 0,
    loading: "animations",
    typeIndex: 0,
    counter: 0,
    timeNeeded: 0,
    order: [
        "animations",
        "fonts",
        "images"
    ],
    paths: {
        fonts: [],
        images: [],
        animations: [],
    },
    onLoad: function(stuff){
        fileLoader.loaded ++;
    },
    failed: function(e){
        console.warn("File didn't load. Error was: "+e+"\nContinuing");
        fileLoader.onLoad();
    },
    loadOne: function(){
        if(this.loadIndex >= this.paths[this.loading].length){
            this.loadIndex = 0;
            this.typeIndex ++;
            if(this.typeIndex >= this.neededTypes){
                return true;
            }
            this.loading = this.order[this.typeIndex];
        }
        let fileObject = this.loading == "fonts" ? fonts : imgs;
        let loaderFunction = this.loading == "animations" ? loadAnimation : (this.loading == "images" ? loadImage : loadFont);
        let data, arg1, arg2, arg3, path;
        data = this.paths[this.loading][this.loadIndex];
        name = this.paths.names[this.loading][this.loadIndex];
        if(this.loading == "animations"){
            arg1 = data[1];
            arg2 = data[2];
        } else {
            arg1 = data;
            arg2 = fileLoader.onLoad;
            arg3 = fileLoader.failed;
        }
        if(arg3){
            fileObject[name] = loaderFunction(arg1, arg2, arg3);
        } else {
            fileObject[name] = loaderFunction(arg1, arg2);
        }
        if(this.loading == "animations"){
            this.onLoad();
            fileObject[name].frameDelay = data[0] || 4;
        }
        this.loadIndex++;
        return false;
    },
    loadAll: function(){
        frameRate(30);
        loadSpecial();
        while(!this.loadOne()){}
    },
    update: function(){
        this.loadProgress = min(this.loadProgress+0.01, this.loaded/this.needed);
        if(this.loaded<this.needed){
            this.loadProgress = this.loaded/this.needed;
            this.counter ++;
        } else if(this.timeNeeded == 0){
            this.timeNeeded = this.counter;
            this.counter = 0;
        } else {
            this.counter ++;
            this.loadProgress = this.counter/this.timeNeeded;
        }
        if(this.loadProgress >= 1){
            frameRate(60);
            game.continue(true);
        }
    },
    display: function(){
        background(0);
        push();
        textAlign(CENTER);
        fill(255);
        textSize(50);
        text("Loading "+this.loading+"...", width/2, height/2);
        stroke(255);
        strokeWeight(5);
        rect(width/2-200, height/2+50, this.loadProgress*400, 50, 10);
        push();
        noFill();
        rect(width/2-200, height/2+50, 400, 50, 10);
        pop();
        pop();
    },
    run: function(){
        this.update();
        this.display();
    }
}
$.getJSON("/scripts/load/files.json", function(data){
    fileLoader.paths = data;
    for(var i in data){
        if(i != "names"){
            for(var j in data[i]){
                fileLoader.needed ++;
            }
        }
    }
    for(var i in data.names){
        fileLoader.neededTypes ++;
    }
});
