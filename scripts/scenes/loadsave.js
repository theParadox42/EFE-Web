
function LoadSaves(){
    // Starry background w/ rocket
    background(0);
    image(imgs.stars, 0, 0, width, height);
    push();
    translate(200, 200);
    rotate(-45);
    let imgw = 200;
    drawAnimation(imgs.rocketOn,0,0,imgw,imgw*imgs.rocketOn.height/imgs.rocketOn.width)
    pop();
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);

    push();
    // congratulations
    noStroke();
    textSize(80);
    fill(200);
    textAlign(CENTER, TOP);
    textFont(fonts.arcade);
    text("Load Saves", width/2, 100);
    // Blah, blah, blah
    fill(255);
    strokeWeight(1);
    stroke(255);
    textAlign(CENTER, TOP);
    textSize(50);
    textFont(fonts.londrina)
    var ds = LoadSaves.displaySave;
    textSize(20);
    fill(255, 255, 255, 200);
    stroke(0);
    strokeWeight(5);
    textAlign(CENTER, CENTER);

    var mx = 50, my = 50, px = 10, py = 10;
    var x = mx, y = 200 + my;
    const w = 200, h = 70;
    var saves = game.retrieveProgress(0, true);
    if(!saves) game.setScene("home");
    else {
        for(var i = 0; i < saves.length; i ++){
            var save = saves[i];
            ds(save, x, y, w, h);
            x += w + px;
            if(x + w > width - mx){
                x = mx;
                y += h + my;
            }
            if(y + h > height - my) {
                saves.pop();
            }
        }
    }

    pop();

    push();
    fill(0, 0, 0, 100);
    stroke(200);
    strokeWeight(5);
    textFont(fonts.londrina)
    textSize(25);
    LoadSaves.HomeBtn.draw();
    pop();
}
LoadSaves.displaySave = function(obj, x, y, w, h){
    rect(x, y, w, h, 10);
    push();
    fill(0);
    stroke(100);
    strokeWeight(2);
    var textReplacements = {
        "run":          "Run to Rocket",
        "launchpad":    "Rocket Launchpad",
        "build":        "Collect Rocket Parts",
        "rocektbuilt":  "Build Rocket",
        "fly-moon":     "Fly to the Moon",
        "moon":         "Moon",
        "fly-mars":     "Fly to Mars",
        "marslanding":  "Mars Landing",
        "fight":        "Mars",
        "leavemars":    "Leave Mars",
        "fly-venus":    "Fly to Venus",
        "seeufo":       "UFO Sighting",
        "ufo":          "UFO Fight",
        "landonvenus":  "Land on Venus",
    }
    var txt = textReplacements[obj.scene];
    if(typeof obj.data == "number"){
        txt += " - " + obj.data;
    }
    if(obj.date){
        txt += "\n"+obj.date.month + "/" + obj.date.day + " - "+obj.date.hour+":"+obj.date.minute;
    }
    text(txt, x+w/2, y+h/2);
    pop();
    if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
        cursor(HAND);
        if(clicked){
            game.loadProgress(obj);
        }
    }
}
LoadSaves.init = function(){
    this.HomeBtn = new Button("Home", 10, height-60, 100, 50, function(){
        game.setScene("home");
    })
}
