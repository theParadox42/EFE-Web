function communityLevels(){
    background(225);

    communityLevels.home.check();

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
        let w = communityDisplays[0].w;
        let h = communityDisplays[0].h;
        var across = floor(width/(w+p));
        var going = 0;
        var my = 0;
        for(var i = 0; i < communityDisplays.length; i ++){
            communityDisplays[i].draw(x, y);
            going++;
            x+=p+w;
            if(going>=across){
                x = p;
                going = 0;
                if(i != communityDisplays.length - 1){
                    y+=h+p
                    if(y+h>height-150){
                        my = y+h-height+150+p;
                    }
                }
            }
        }
        scroller.maxY = -my;
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

    push();
    fill(255);
    stroke(0);
    strokeWeight(5);
    textFont(fonts.bladerunner);
    textSize(25);
    communityLevels.home.display(color(0));
    pop();
}
communityLevels.hasLoaded = false;
communityLevels.init = function(){
    communityLevels.home = new Button("Home", 10, height-60, 100, 50, function(){
        game.setScene("home");
    })
    if(cLevels.length <= 0 || communityDisplays.length > 0) return;
    communityLevels.hasLoaded = true;
    for(var i = 0; i < cLevels.length; i ++){
        communityDisplays.push(new LevelDisplay(cLevels[i], 200, 250));
    }
    scroller.reset();
}
let scroller = {
    x: 0,
    y: 0,
    ax: 0,
    ay: 0,
    update: function(){
        if(mouseY<200&&mouseY>100){
            this.y = min(this.y+map(mouseY, 100, 200, 15, 5), 0);
        } else if(mouseY>height-100){
            this.y = max(this.y-map(mouseY, height, height-100, 15, 5), (this.maxY||0));
        } if(keys[DOWN_ARROW] || keys.s){
            this.y = max(this.y-10, (this.maxY||0));
        } if(keys[UP_ARROW] || keys.w){
            this.y = min(this.y+10, 0);
        }
        this.ax = this.x;
        this.ay = this.y+100;
        translate(this.x, this.y);
    },
    reset: function(){
        this.x = 0;
        this.y = 0;
        this.ax = 0;
        this.ay = 0;
    }
};
let cLevels = [];

// JSON loading
function getCommunityLevels(){
    var communityLevelsPath = "https://escape-from-earth.herokuapp.com/levels";
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
setInterval(getCommunityLevels, 10000);

function postLevel(newLevel){
    newLevel.waitingForUpdate = true;
    $.post("https://escape-from-earth.herokuapp.com/levels/new", newLevel, function(data){
    // $.post("http://localhost:8080/levels/new", newLevel, function(data){
        getCommunityLevels();
        for(var i = 0; i < levelsBuilt.length; i ++){
            var l = levelsBuilt[i];
            if(l.waitingForUpdate){
                if(l.title == data.title && l.creator == data.creator){
                    levelsBuilt[i] = data;
                    var l = levelsBuilt[i];
                    l.waitingForUpdate = false;
                    l.uploaded = true;
                    console.log("Updated level _id")
                    levelBuilder.save();
                }
            }
        }
    }).catch(function(e, t, n){
        console.log("Error posting new level")
        console.log(t);
        console.log(n);
    });
}
