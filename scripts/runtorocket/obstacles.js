var maps;
let obstacles = [];
var loadRun = {
    level: 0,
    maps: maps,
    current: {},
    map: "",
    key: {},
    init: function(){
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
        this.reload();
    },
    reload: function(){
        obstacles = [];
        runPlayer.reset();
        for(var i = 0; i < this.map.length; i ++){
            var x = i * runObstacleWidth;
            var constructor = this.key[this.map[i]];
            if(constructor) obstacles.push(new constructor(x));
        }
    },
    next: function(){
        this.level ++;
        // this.load();
    }
}
var runObstacleWidth = 100;
$.getJSON("/scripts/runtorocket/runmap.json", function(d){
    loadRun.maps = d.levels;
});
