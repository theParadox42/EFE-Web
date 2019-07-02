function createNewLevel(){
    background(255);
    var cnl = createNewLevel;
}
createNewLevel.init = function(){
    this.nameInput = createInput("New Level", "text");
    this.nameInput.position(50, 50)
}
