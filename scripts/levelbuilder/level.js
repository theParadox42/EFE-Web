function LevelBuilderLevel(title, creator, type, difficulty){
    this.title = title || "New Level";
    this.creator = creator || "Anonymous";
    this.type = type || "";
    this.difficulty = difficulty || 1;
    this.verified = false;
    this.uploaded = false;
    this.waitingForUpdate = false;
    this.levelBuilderLevel = true;
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
                asteroids: [],
                ufos: [],
                boss: []
            }
        break;
        case "mars":
            this.objects = {
                blocks: [
                    {
                        x: 0,
                        y: 2,
                    }
                ]
            }
        break;
    }
}
LevelBuilderLevel.updateLevel = function(level, title, creator, w, h){
    level.title = title || level.title;
    level.creator = creator || level.creator;
    if(w){
        switch(level.type){
            case "run":
                var sMap = level.map.split("");
                while(sMap.length > w){
                    sMap.pop();
                    sMap[sMap.length-1] = "%";
                }
                while(sMap.length < w){
                    sMap.push("%");
                    sMap[sMap.length-2] = "_";
                }
                level.map = sMap.join("");
            break;
            case "build":
                if(h){
                    while(level.level.length > h){
                        level.level.pop();
                    }
                    while(level.level.length < h){
                        var newFloor = new Array(level.level[0].length);
                        newFloor.fill("_");
                        level.level.push(newFloor.join(""));
                    }
                }
                if(w){
                    while(level.level[0].length > w){
                        for(var i = 0; i < level.level.length; i ++){
                            level.level[i] = level.level[i].replaceAt(level.level[i].length-1, "");
                        }
                    }
                    while(level.level[0].length < w){
                        for(var i = 0; i < level.level.length; i ++){
                            level.level[i] += "_";
                        }
                    }
                }
            break;
        }
    }

}
