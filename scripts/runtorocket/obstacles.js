let runObstacles = [], runSigns = [], runBuildings = [];

var loadRun = {
    level: 2,
    maps: [],
    current: {},
    map: "",
    key: {},
    buildings: 30,
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
        runBuildings = [];
        runSigns = [];
        runObstacles = [];
        for(var i = 0; i < this.map.length; i ++){
            var x = i * runObstacleWidth;
            var constructor = this.key[this.map[i]];
            if(constructor) runObstacles.push(new constructor(x));
        }
        if(this.signs) {
            for(var i = 0; i < this.signs.length; i ++){
                var txt = this.txtKey[this.signs[i]];
                if(txt) runSigns.push(new RunSign(i*runObstacleWidth, txt));
            }
        }
        for(var i = 0; i < this.buildings; i ++){
            runBuildings.push(new RunBuilding(random(-50, width+50), ~~random(6)+2, random(400, 500), ~~random(imgs.buildings.length)))
            runBuildings.sort(function(a, b){
                return b.z - a.z;
            });
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
