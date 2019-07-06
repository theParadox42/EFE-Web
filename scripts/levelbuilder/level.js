function LevelBuilderLevel(name, creator, type, difficulty){
    this.name = name || "New Level";
    this.creator = creator || "Anonymous";
    this.type = type || "";
    this.difficulty = difficulty || 1;
    switch(this.type){
        case "run":
            this.map = "___c=__^__^____^__xxl%";
        break;
        case "build":
            this.level = [
                "                        ",
                "                        ",
                "                        ",
                "                        ",
                "                        ",
                "                        ",
                "                        "
            ]
        break;
        case "space":

        break;
        case "mars":

        break;
    }
}
