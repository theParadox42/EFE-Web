var maps;
let obstacles = [];
let signs = [];
var loadRun = {
    level: 0,
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
            "%": RunNext
        }
    },
    load: function(){
        if(!this.maps[this.level]) return console.log("missing map");
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
        for(var i = 0; i < this.signs.length; i ++){
            
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
