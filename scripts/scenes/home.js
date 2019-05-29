
function Home(){

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
    textSize(80);
    fill(200);
    textAlign(CENTER, BOTTOM);
    textFont(fonts.bladerunner);
    text("Escape From", width/2, height/2-150);
    // Earth
    fill(255);
    strokeWeight(1);
    stroke(255);
    textAlign(CENTER, TOP);
    textSize(120);
    textFont(fonts.arcade);
    text("EARTH", width/2, height/2-150);
    pop();

    // Buttons
    push();
    fill(0, 0, 0, 100);
    stroke(200);
    strokeWeight(5);
    textFont(fonts.londrina)
    textSize(50);
    Home.play.draw();
    if(hasWon||true){
        textSize(25);
        Home.build.draw();
        Home.community.draw();
    }
    pop();
}
Home.init = function(){
    Home.play = new Button("Play Story Mode", width/2-200, height/2+10, 400, 100, function(){
        game.continue();
    });
    Home.build = new Button("Build Levels", width/2-200, height/2+130, 190, 100, function(){
        game.setScene("levelbuilder");
    });
    Home.community = new Button("Play Community\nLevels", width/2+10, height/2+130, 190, 100, function(){
        game.setScene("communitylevels");
    });
}
let hasWon = localStorage.hasWon || false;
