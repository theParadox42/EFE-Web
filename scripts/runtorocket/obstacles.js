let runObstacles = [], runSigns = [], runBuildings = [];

var loadRun = {
    level: 0,
    maps: [],
    current: {},
    map: "",
    key: {},
    buildings: 20,
    clouds: 3,
    init: function(){
        this.txtKey = {
            "j": "Click/Space/UP/W to jump!",
            "f": "Use the arrow keys to move faster/slower",
            "d": "S/DOWN to duck"
        }
        this.key = {
            "c": RunCar,
            "x": RunTrash,
            "^": RunSpike,
            "l": RunStreetLight,
            "%": RunNext
        }
    },
    load: function(){
        if(!this.maps[this.level]) return game.continue();
        this.current = this.maps[this.level];
        this.map = this.current.map;
        this.signs = this.current.txt;
        this.reload();
    },
    reload: function(){
        runPlayer.reset();
        runGround.reset();
        runScenery = [];
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
            runScenery.push(new RunBuilding(random(-200,width+200),random(2,6),random(400,500),~~random(imgs.buildings.length)))
        }
        for(var i = 0; i < this.clouds; i ++){
            runScenery.push(new RunCloud(random(-200, width+200)));
        }
        runScenery.sort(function(a, b){
            return b.z - a.z;
        });
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
