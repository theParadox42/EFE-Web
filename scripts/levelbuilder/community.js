function communityLevels(){
    background(225);

    if(!communityLevels.hasLoaded){
        if(cLevels.length>0){
            communityLevels.hasLoaded = true;
            communityLevels.init();
        }
        push();
        textAlign(CENTER);
        fill(0);
        textFont(fonts.londrina);
        textSize(40);
        let dots = "";
        let fc = frameCount%100;
        dots += fc > 25 ? (fc > 50 ? (fc > 75 ? "..." : "..") : ".") : "";
        text("Loading."+dots, width/2, height/2);
        pop();
    } else {
        push();
        translate(0, 100);
        scroller.update();
        let p = 20;
        var x = p;
        var y = p;
        let w = levelDisplays[0].w;
        let h = levelDisplays[0].h;
        var across = floor(width/(w+p));
        var going = 0;
        console.log(across);
        for(var i = 0; i < levelDisplays.length; i ++){
            levelDisplays[i].draw(x, y);
            going++;
            x+=p+w;
            if(going>=across){
                x = p;
                y+=h+p
                going = 0;
            }
        }
        pop();
    }

    push();
    noStroke();
    fill(0, 0, 0, 10);
    rect(0, 95, width, 10);
    fill(255);
    rect(0, 0, width, 100);
    textAlign(CENTER, BOTTOM);
    fill(0);
    textFont(fonts.arcade);
    textSize(50);
    stroke(200);
    strokeWeight(3);
    text("Community Levels", width/2, 75);
    pop();
}
communityLevels.hasLoaded = false;
communityLevels.init = function(){
    if(cLevels.length <= 0) return false;
    communityLevels.hasLoaded = true;
    for(var i = 0; i < cLevels.length; i ++){
        levelDisplays.push(new LevelDisplay(cLevels[i], 200, 200));
    }
}
let scroller = {
    x: 0,
    y: 0,
    ax: 0,
    ay: 0,
    update: function(){
        if(mouseY<200&&mouseY>100){
            cursor("n-resize");
            this.y = min(this.y+map(mouseY, 100, 200, 15, 5), 0);
        } else if(mouseY>height-100){
            cursor("s-resize");
            this.y = max(this.y-map(mouseY, height, height-100, 15, 5), -Infinity);
        } if(keys[DOWN_ARROW] || keys.s){
            this.y = max(this.y-10, -Infinity);
        } if(keys[UP_ARROW] || keys.w){
            this.y = min(this.y+10, 0);
        }
        this.ax = this.x;
        this.ay = this.y+100;
        translate(this.x, this.y);
    },
};
let cLevels = [];

// JSON loading
function getCommunityLevels(){
    var communityLevelsPath = "http://escape-from-earth.herokuapp.com/levels";
    $.getJSON(communityLevelsPath, function(data){
        cLevels = data;
    }).catch(function(){
        communityLevelsPath = "/scripts/levelbuilder/stashedcommunitylevels.json";
        $.getJSON(communityLevelsPath, function(data){
            console.log("Failed to load external resource, stuck with local")
            communityLevels.level = data;
        }).catch(function(e){
            console.log("Failed to load any community levels")
        })
    });
}
getCommunityLevels();
setInterval(getCommunityLevels, 30000);

function postLevel(newLevel){
    $.post("http://escape-from-earth.herokuapp.com/levels/new", newLevel, function(data){
        console.log(data);
    })
}
/*
postLevel({
    map: "______^____^",
    creator: "theParadox42",
    difficulty: 1,
    type: "run"
})
*/
