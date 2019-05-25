function Won(){
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
    // congratulations
    noStroke();
    textSize(80);
    fill(200);
    textAlign(CENTER, BOTTOM);
    textFont(fonts.arcade);
    text("Congratulations!", width/2, height/2-150);
    // Blah, blah, blah
    fill(255);
    strokeWeight(1);
    stroke(255);
    textAlign(CENTER, TOP);
    textSize(50);
    textFont(fonts.londrina)
    text("You made your own rocket, defeated martians, destroyed the UFO, and safely landed on Venus", 100, height/2-150, width-200, 200);

    // New stuff
    textFont(fonts.pixel);
    textSize(40);
    fill(0, 120, 120);
    noStroke();
    let message = "You unlocked Community Levels!"
    let tw = textWidth(message);
    rect(width/2-tw/2-30, height-100, tw+50, 70, 10);
    fill(255);
    text(message, width/2, height-80);

    pop();

    // Buttons
    fill(0, 0, 0, 200);
    textSize(40);
    textFont(fonts.londrina);
    strokeWeight(5);
    stroke(240);
    Won.menu.draw();
}
Won.init = function(){
    Won.menu = new Button("Menu",width/2-150, height/2+50, 300, 60, function(){
        game.setScene("home");
    });
    localStorage.hasWon = true;
    hasWon = localStorage.hasWon;
}
