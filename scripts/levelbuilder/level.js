function LevelBuilderLevel(title, creator, type, difficulty){
    this.title = title || "New Level";
    this.creator = creator || "Anonymous";
    this.type = type || "";
    this.difficulty = difficulty || 1;
    switch(this.type){
        case "run":
            this.map = "_______________%";
        break;
        case "build":
            this.level = [
                "________________________",
                "________________________",
                "________________________",
                "________________________",
                "________________________",
                "________________________",
                "________________________"
            ]
        break;
        case "space":
            this.objects = {
                width: 200,
                asteroids: [

                ],
                ufos: [
                    
                ]
            }
        break;
        case "mars":

        break;
    }
}
