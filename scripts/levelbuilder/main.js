// Level data
var levelsBuilt = JSON.parse(localStorage.myLevels || "[]");
var currentBuildingLevel = null;

// Level Builder Function
function levelBuilder(){
    if(levelBuilder.isPaused) return levelBuilder.paused();
    if(levelBuilder.isEditingStats) return levelBuilder.editingStats();
    levelBuilder.getFunc()();
}
levelBuilder.getFunc = function(){
    switch(levelBuilder.building){
        case "run":
            return buildRunMap;
        break;
        case "build":
            return buildPlatformer;
        break;
        case "space":
            return buildSpaceLevel;
        break;
        case "mars":
            return buildArena;
        break;
        case "new":
            return createNewLevel;
        break;
        case "none":
            return levelBuilderMenu;
        break;
        default:
            levelBuilder.building = "none";
            return levelBuilderMenu;
        break;
    }
}
levelBuilder.setType = function(type){
    levelBuilder.building = type;
    if(typeof this.getFunc().init == "function") this.getFunc().init();
    this.save();
}
levelBuilder.addLevel = function(level){
    levelsBuilt.unshift(level);
    this.save();
    console.log("added a level");
}
levelBuilder.removeLevel = function(i){
    levelsBuilt.splice(i, 1);
    this.save();
}
levelBuilder.openLevel = function(i){
    currentBuildingLevel = levelsBuilt[i];
    this.setType(currentBuildingLevel.type);
}
levelBuilder.save = function(){
    for(var i = 0; i < levelsBuilt.length; i ++){
        levelsBuilt[i].index = i;
    }
    localStorage.myLevels = JSON.stringify(levelsBuilt || "[]");
}
levelBuilder.pause = function(){
    this.isPaused = true;
    this.isEditingStats = false;
    push();
    resetMatrix();
    noStroke();
    fill(0, 0, 0, 200);
    rect(0, 0, width, height);
    pop();
    if(isMobile()){
        this.pausedImg = get();
    }
}
levelBuilder.paused = function(){
    // Display
    push();
    resetMatrix();
    if(isMobile()){
        image(this.pausedImg, 0, 0, width, height);
    } else {
         background(80, 80, 80);
    }
    // Title
    fill(255);
    textFont(fonts.londrina);
    textSize(80);
    textAlign(CENTER, TOP);
    text(currentBuildingLevel.name, width/2, 10)

    // Buttons
    fill(245);
    stroke(10);
    strokeWeight(3);
    rect(width/4,    100,  width/2,    80, 20);
    rect(width/4,    200,  width/4-10, 80, 20);
    rect(width/2+10, 200,  width/4-10, 80, 20);
    rect(width/4,    300,  width/4-10, 60, 20);
    rect(width/2+10, 300,  width/4-10, 60, 20);
    noStroke();
    fill(10);
    textFont(fonts.londrina);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Resume",      width/2,    140);
    textSize(30);
    text("Save",         width/4,    240, width/4);
    text("Save & Quit",  width/2+10, 240, width/4-10);
    textSize(25);
    text("Delete Level", width/4,    330, width/4);
    text("Play",    width/2+10, 330, width/4-10);
    pop();

    // Logic
    if(mouseX>width/4&&mouseX<width*3/4){
        if(mouseY>100&&mouseY<180){
            cursor(HAND);
            if(clicked){
                this.isPaused = false;
            }
        }
        if(mouseX<width/2-10){
            if(mouseY>200&&mouseY<280){
                cursor(HAND);
                if(clicked){
                    this.save();
                }
            } else if(mouseY>300&&mouseY<360){
                cursor(HAND);
                if(clicked){
                    this.removeLevel(currentBuildingLevel.index);
                    this.setType("none");
                    this.isPaused = false;
                }
            }
        } else if(mouseX>width/2+10){
            if(mouseY>200&&mouseY<280){
                cursor(HAND);
                if(clicked){
                    this.save();
                    this.setType("none");
                    this.isPaused = false;
                }
            } else if(mouseY>300&&mouseY<360){
                cursor(HAND);
                if(clicked){
                    playLevel.setup(currentBuildingLevel, game.currentScene)
                    game.setScene("playlevel");
                    this.isPaused = false;
                }
            }
        }
    }

    clicked = false;
}
levelBuilder.editStats = function(){
    this.isEditingStats = true;
    this.isPaused = false;
    this.ei = {};//edit inputs
    var ei = this.ei;
    ei.title = createInput(currentBuildingLevel.title, "text");
    ei.title.attribute("placeholder", "Title");
    ei.title.position(width/4, 50);
    ei.title.style("width", width/2+"px");
    ei.title.addClass("big-text");

    ei.creator = createInput(currentBuildingLevel.creator, "text");
    ei.creator.attribute("placeholder", "Creator");
    ei.creator.position(width/4, 150);
    ei.creator.style("width", width/2+"px");
    ei.creator.addClass("big-text");

    var doWidth,
        minWidth,
        currentWidth,
        doHeight,
        minHeight,
        currentHeight;
    switch(currentBuildingLevel.type){
        case "run":
            doWidth = true;
            minWidth = 10;
            currentWidth = currentBuildingLevel.map.length;
        break;
        case "build":
            doWidth = true;
            minWidth = 15;
            currentWidth = currentBuildingLevel.level[0].length;
            doHeight = true;
            minHeight = 8;
            currentHeight = currentBuildingLevel.level.length;
        break;
        case "space":
            doWidth = true;
            minWidth = 200;
            currentWidth = currentBuildingLevel.objects.width;
        break;
    }
    var by = 250
    if(doWidth){
        ei.width = createInput(currentWidth, "number");
        ei.width.attribute("placeholder", "Width");
        ei.width.position(width/4, 250);
        ei.width.style("width", width/2+"px");
        ei.minWidth = minWidth;
        by+=80;
    } if(doHeight){
        ei.height = createInput(currentHeight, "number");
        ei.height.attribute("placeholder", "Height");
        ei.height.position(width/4, 330);
        ei.height.style("width", width/2+"px");
        ei.minHeight = minHeight;
        by+=80;
    }
    ei.submit = createButton("Save");
    ei.submit.position(width/4, by);
    ei.submit.style("width", (width/4-10)+"px");
    ei.submit.mouseReleased(function(){
        ei.waitFor.submit = true;
    })

    ei.cancel = createButton("Cancel");
    ei.cancel.position(width/2+10, by);
    ei.cancel.style("width", (width/4-10)+"px");
    ei.cancel.mouseReleased(function(){
        ei.waitFor.cancel = true;
    })

    ei.waitFor = {};
    ei.destroyInputs = function(){
        for(var i in ei){
            if(typeof ei[i] == "object"){
                if(typeof ei[i].remove == "function") ei[i].remove();
            }
        }
    }
}
levelBuilder.editingStats = function(){
    background(245);
    var ei = this.ei;

    if(clicked){
        if(ei.waitFor.submit){
            if(ei.width){
                ei.width.value(max(ei.minWidth, ei.width.value()))
            }
            if(ei.height){
                ei.height.value(max(ei.minHeight, ei.height.value()))
            }
            LevelBuilderLevel.updateLevel(currentBuildingLevel,ei.title.value(), ei.creator.value(), ei.width?ei.width.value():null, ei.height?ei.height.value():null);
            this.isEditingStats = false;
            ei.destroyInputs();
            if(typeof this.getFunc().init == "function") this.getFunc().init();
        } else if(ei.waitFor.cancel){
            this.isEditingStats = false;
            ei.destroyInputs();
        }
    }
}
levelBuilder.init = function(){
    this.isPaused = false;
    this.isEditingStats = false;

    levelBuilder.building = levelBuilder.building || "none";
    // levelBuilder.building = "new";

    levelBuilderMenu.init();
    // createNewLevel.init();
}
levelBuilder.createNew = function(){
    levelBuilder.building = "new";
}
