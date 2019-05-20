let bGame = {
    maps: [],
    map: [],
    current: {},
    blocks: [],
    player: null,
    level: 0,
    bw: 100,
    bh: 100,
    key: {},
    run: function(){
        if(!this.player) return;
        push();
        scale(height/this.map.length/this.bh);
        for(var i = 0; i < this.blocks.length; i ++){
            this.blocks[i].run(this.player);
        }
        this.player.run();
        pop();
    },
    getConst: function(char){
        switch(char){
            case "@": return BSpawn; break;
            case "#": return BBlock; break;
            case "^": return BSpike; break;
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
        this.level = 0;
        this.load();
    },
    load: function(){
        this.map = this.maps[this.level].map;
        this.reload();
    },
    reload: function(){
        for(var i = 0; i < this.map.length; i ++){
            for(var j = 0; j < this.map[i].length; j ++){
                let k = this.map[i][j];
                if(k == "*"){
                    k += this.maps[this.level].item;
                }
                let x = j * this.bw;
                let y = i * this.bh;
                if(this.getConst(k)){
                    this.blocks.push(new (this.getConst(k))(x, y, this.bw, this.bh));
                } if(k == "@") {
                    this.player = new BPlayer(x, y, this.bh*0.75);
                }
            }
        }
    }
}

$.getJSON("/scripts/buildrocket/levels.json", function(data){
    bGame.maps = data.levels;
})
