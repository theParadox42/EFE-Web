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
        for(var i = 0; i < this.blocks.length; i ++){
            if(typeof this.blocks.run == "function"){
                this.blocks[i].run(this.player);
            } else {
                console.log(this.blocks[i]);
            }
        }
        this.player.run();
    },
    init: function(){
        this.key = {
            "#": BBlock,
            "^": BSpike,
            "%": BPortal,
            "*": BPart
        }
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
                let x = j * this.bw;
                let y = i * this.bh;
                let constructor = this.key[this.map[i][j]];
                if(this.map[i][j]=="*"){
                    constructor = constructor[this.current.item]
                }
                if(constructor){
                    this.blocks.push(new constructor(x, y, this.bw, this.bh));
                } if(this.map[i][j] == "@") {
                    this.player = new BPlayer(x, y, this.bh);
                }
            }
        }
    }
}

$.getJSON("/scripts/buildrocket/levels.json", function(data){
    bGame.maps = data.levels;
})
