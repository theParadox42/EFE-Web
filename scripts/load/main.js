function loadFiles(){
    fileLoader.run();
}
let fileLoader = {
    loaded: 0,
    loading: "fonts",
    paths: {
        fonts: [],
        imgs: [],
        anims: [],
    },
    update: function(){

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
        this.update();
        this.display();
    }
}
$.getJSON("/scripts/load/files.json", function(data){
    fileLoader.paths = data;
});
