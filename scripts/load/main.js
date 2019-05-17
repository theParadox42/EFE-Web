function loadFiles(){
    fileLoader.run();
}
let fileLoader = {
    loaded: 0,
    loadIndex: 0,
    loading: "fonts",
    order: [
        "fonts",
        "images",
        "animations"
    ],
    paths: {
        fonts: [],
        images: [],
        animations: [],
    },
    update: function(){
        this.loaded++;
        if(this.loadIndex > this.paths[this.loading].length){
            this.
        }
        imgs[this.paths.names[this.loading][this.loadIndex]
    },
    display: function(){
        background(0);
        push();
        textAlign(CENTER);
        fill(255);
        textSize(50);
        text("Loading...", width/2, height/2);
        pop();
    },
    run: function(){
        this.display();
    }
}
$.getJSON("/scripts/load/files.json", function(data){
    fileLoader.paths = data;
});
