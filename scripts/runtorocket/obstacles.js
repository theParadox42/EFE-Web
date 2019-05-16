var maps;
let obstacles = [];
let signs = [];
var loadRun = {
    level: 2,
    maps: maps,
    current: {},
    map: "",
    key: {},
    init: function(){
        this.txtKey = {
            "j": "Click/Space/UP/W to jump!",
            "f": "Use the arrow keys to move faster/slower",
            "d": "S/DOWN to duck"
        }
        this.key = {
            "c": RunCar,
            "^": RunSpike,
            "l": RunStreetLight,
            "%": RunNext
        }
    },
    load: function(){
        if(!this.maps[this.level]) return;
        this.current = this.maps[this.level];
        this.map = this.current.map;
        this.signs = this.current.txt;
        this.reload();
    },
    reload: function(){
        runPlayer.reset();
        runGround.reset();
        obstacles = [];
        for(var i = 0; i < this.map.length; i ++){
            var x = i * runObstacleWidth;
            var constructor = this.key[this.map[i]];
            if(constructor) obstacles.push(new constructor(x));
        }
        signs = [];
        if(this.signs) {
            for(var i = 0; i < this.signs.length; i ++){
                var txt = this.txtKey[this.signs[i]];
                if(txt){
                    signs.push(new RunSign(i*runObstacleWidth, txt));
                }
            }
        }
    },
    next: function(){
        this.level ++;
        this.load();
    }
}
var runObstacleWidth = 100;
$.getJSON("/scripts/runtorocket/runmap.json", function(d){
    loadRun.maps = d.levels;
});
