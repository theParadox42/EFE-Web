
function ChooseUseSave(){

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

    // Text
    push();
    // Escape From
    noStroke();
    textSize(50);
    fill(255);
    textAlign(CENTER, TOP);
    textFont(fonts.londrina);
    text("Would you like to start over, or resume your current game?", 20, 50, width-40, 300);
    pop();

    push();
    fill(0, 0, 0, 100);
    stroke(200);
    strokeWeight(5);
    textFont(fonts.londrina)
    textSize(50);
    var cus = ChooseUseSave;
    cus.resume.draw();
    cus.restart.draw();
    textSize(25);
    cus.alwaysResume.draw();
    cus.alwaysRestart.draw();

    pop();

}
ChooseUseSave.init = function(){
    this.resume = new Button("Resume", width/2-300, 320, 290, 100, function(){
        game.loadProgress();
    });
    this.alwaysResume = new Button("Always Resume", width/2-300, 440, 290, 100, function(){
        game.loadFirstOnPlay = "always";
        game.loadProgress();
    });
    this.restart = new Button("Restart", width/2+10, 320, 290, 100, function(){
        game.setScene(2);
    });
    this.alwaysRestart = new Button("Always Restart", width/2+10, 440, 290, 100, function(){
        game.loadFirstOnPlay = "never";
        game.setScene(2);
    });
}
