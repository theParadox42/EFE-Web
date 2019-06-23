
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

    var x = 50, y = 250
    var saves = game.retrieveProgress();
    if(!saves) game.setScene("home");
    else {
        for(var i = 0; i < saves.length; i ++){
            var save = saves[i];
            var txt = save.scene;
            if(save.date){

            }
            ds(txt, x, y);
        }
    }

    pop();
}
LoadSaves.displaySave = function(txt, x, y){
    var w = 200, h = 70;
    rect(x, y, w, h, 10);
    push();
    fill(0);
    stroke(100);
    strokeWeight(2);
    text(txt, x+w/2, y+h/2);
    pop();
}
LoadSaves.init = function(){

}
