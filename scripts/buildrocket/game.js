let bGame = {
    maps: [],
    map: {},
    blocks: [],
    player: null,
    level: 0,
    bw: 100,
    bh: 100,
    key: {},
    run: function(){
        for(var i = 0; i < this.blocks.length; i ++){
            this.blocks.run(this.player);
        }
        this.player.run();
    },
    init: function(){
        this.key = {
            "#": BBlock,
            "^": BSpike,
            "%": BPortal,
        }
    },
    next: function(){
        this.level = 0;
        this.load();
    },
    load: function(){
        this.map = this.maps[this.level];
        this.reload();
    },
    reload: function(){
        for(var i = 0; i < this.map.length; i ++){
            for(var j = 0; j < this.map[i].length; j ++){
                let x = j * this.bw;
                let y = i * this.bh;
                let constructor = this.key[this.map[i][j]];
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
