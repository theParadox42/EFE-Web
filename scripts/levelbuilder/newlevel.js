function createNewLevel(){
    background(255);

    localStorage.author = inputs.creator.value();

    if(createNewLevel.waitForRelease && clicked){
        clicked = false;
        createLevel();
    }
}
createNewLevel.init = function(){

    this.waitForRelease = false;

    inputs.name = createInput("New Level", "text");
    inputs.name.position(width/4, 50);
    inputs.name.addClass("big-text")
    inputs.name.attribute("placeholder", "Level Name");
    inputs.name.style("width", (width/2)+"px");

    inputs.creator = createInput(localStorage.author || "Anonymous", "text");
    inputs.creator.position(width/4, 150);
    inputs.creator.addClass("big-text");
    inputs.creator.attribute("placeholder", "Creator");
    inputs.creator.style("width", (width/2)+"px");

    inputs.type = createSelect("run");
    inputs.type.position(width/4, 250);
    inputs.type.style("width", (width/2)+"px");
    inputs.type.option("Run", "run");
    inputs.type.option("Platformer", "build")//.attribute("disabled");
    inputs.type.option("Space", "space");
    inputs.type.option("Mars", "mars");

    inputs.submit = createButton("Create!");
    inputs.submit.position(width/4, 320);
    inputs.submit.style("width", (width/2+50)+"px");
    inputs.submit.mouseReleased(function(){
        createNewLevel.waitForRelease = true;
    });
}
function createLevel(){
    levelBuilder.addLevel(new LevelBuilderLevel(inputs.name.value(), inputs.creator.value(),inputs.type.value()));
    levelBuilder.openLevel(0);
    levelBuilder.setType(inputs.type.value());
    inputs.destroyAll();
    clicked = false;
}
var inputs = {};
inputs.destroyAll = function(){
    for(var i in inputs){
        if(typeof inputs[i] != "function"){
            inputs[i].remove();
        }
    }
}
