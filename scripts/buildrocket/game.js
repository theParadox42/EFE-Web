let bGame = {
    maps: [],
    map: [],
    current: {},
    blocks: [],
    buildings: [],
    player: null,
    level: 1,
    bw: 100,
    bh: 100,
    h: 0,
    w: 0,
    sw: 0,
    sh: 0,
    key: {},
    scaleFactor: 0,
    canPass: true,
    mode: "story",
    run: function(){

        if(!this.player || !(this.player instanceof BPlayer)) return;

        for(var i = 0; i < this.buildings.length; i ++){
            this.buildings[i].run(this.player);
        }
        push();
        noStroke();
        fill(255, 50);
        rect(0, 0, width, height);
        pop();

        push();
        scale(this.scaleFactor);
        translate(this.player.getTransX(), 0);
        this.player.update();
        for(var i = this.blocks.length-1; i > -1; i --){
            this.blocks[i].run(this.player);
            if(this.blocks[i].collected){
                this.blocks.splice(i, 1);
                this.canPass = true;
            }
        }
        this.player.display();
        pop();

        // Health Bar
        push();
        noStroke();
        fill(lerpColor(color(255, 0, 0), color(0, 255, 0), constrain(this.player.health/100, 0, 1)));
        rect(width-210, 10, max(this.player.health, 0)*2, 50);
        noFill();
        stroke(0);
        strokeCap(SQUARE);
        strokeWeight(10);
        rect(width-210, 10, 200, 50);
        pop();
    },
    getConst: function(char){
        switch(char){
            case "a": return BAsphalt; break;
            case "#": return BBlock; break;
            case "r": return BRefinery; break;
            case "-": return BPlatform; break;
            case "'": return BSmoke; break;
            case "^": return BSpike; break;
            case "~": return BWater; break;
            case "x": return BToxic; break;
            case "o": return BProton; break;
            case "f": return BFire; break;
            case "%": return BPortal; break;
            case "*0": return BPart[0]; break;
            case "*1": return BPart[1]; break;
            case "*2": return BPart[2]; break;
            default: return null; break;
        }
    },
    init: function(){
        this.load();
    },
    next: function(){
        if(this.mode!="story") return game.setScene(this.gobackto);
        this.level ++;
        if(this.maps[this.level]){
            this.load();
        } else {
            game.continue();
        }
    },
    load: function(){
        this.mode = game.currentScene == "build" ? "story" : "freeplay";
        if(!this.maps[this.level]&&this.mode=="story") return;
        if(this.mode == "story"){
            this.map = this.maps[this.level].map;
        } else if(!this.map) return;
        this.scaleFactor = height/this.map.length/this.bh;
        this.h = this.map.length * this.bh;
        this.w = this.map[0].length * this.bw;
        this.sw = 1/this.scaleFactor * width;
        this.sh = 1/this.scaleFactor * height;
        this.buildings = [];
        for(var i = 0; i < 20; i ++){
            this.buildings.push(new RunBuilding(random(width), random(2, 6), random(height*3/4, height/2), ~~random(imgs.buildings.length)));
        }
        this.buildings.sort(function(a, b){
            return b.z-a.z;
        });
        this.reload();
    },
    reload: function(){
        this.blocks = [];
        for(var i = 0; i < this.map.length; i ++){
            for(var j = 0; j < this.map[i].length; j ++){
                let k = this.map[i][j];
                if(k == "*"){
                    k += this.maps[this.level].item;
                    this.canPass = false;
                }
                let x = j * this.bw;
                let y = i * this.bh;
                if(this.getConst(k)){
                    this.blocks.push(new (this.getConst(k))(x, y, this.bw, this.bh));
                } if(k == "@") {
                    this.player = new BPlayer(x, y+this.bh, this.bh*0.75);
                }
            }
        }
    }
}

$.getJSON("/scripts/buildrocket/levels.json", function(data){
    bGame.maps = data.levels;
})
