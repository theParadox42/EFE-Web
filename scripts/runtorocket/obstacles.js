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
            "^": RunSpike
        }
    },
    load: function(){
        console.log(this.maps);
        if(!this.maps[this.level]) return;
        this.current = this.maps[this.level];
        this.map = this.current.map;
        this.reload();
    },
    reload: function(){
        for(var i = 0; i < this.map.length; i ++){
            var x = i * runObstacleWidth;

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
