function createNewLevel(){
    background(255);

    localStorage.author = inputs.creator.value();
}
createNewLevel.init = function(){
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
    inputs.type.option("Platformer", "build");
    inputs.type.option("Space", "space");
    inputs.type.option("Mars", "mars");

    inputs.submit = createButton("Create!");
    inputs.submit.position(width/4, 320);
    inputs.submit.style("width", (width/2+50)+"px");
    inputs.submit.mouseReleased(createLevel);
}
function createLevel(){
    levelsBuilt.unshift(new LevelBuilderLevel(inputs.name.value(), inputs.creator.value(),inputs.type.value()));
    levelBuilder.building = inputs.type.value();
    inputs.destroyAll();
    currentBuildingLevel = levelsBuilt[0];
}
var inputs = {};
inputs.destroyAll = function(){
    for(var i in inputs){
        if(typeof inputs[i] != "function"){
            inputs[i].remove();
        }
    }
}
