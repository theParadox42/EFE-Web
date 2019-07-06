// Level data
var levelsBuilt = JSON.parse(localStorage.myLevels || "[]");
var currentBuildingLevel = null;

// Level Builder Function
function levelBuilder(){
    if(levelBuilder.isPaused) return levelBuilder.paused();
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
    push();
    resetMatrix();
    noStroke();
    fill(0, 0, 0, 200);
    rect(0, 0, width, height);
    pop();
    this.pausedImg = get();
}
levelBuilder.paused = function(){
    // Display
    push();
    resetMatrix();
    image(this.pausedImg, 0, 0, width, height);

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
levelBuilder.init = function(){
    this.isPaused = false;

    levelBuilder.building = levelBuilder.building || "none";
    // levelBuilder.building = "new";

    levelBuilderMenu.init();
    // createNewLevel.init();
}
levelBuilder.createNew = function(){
    levelBuilder.building = "new";
}
