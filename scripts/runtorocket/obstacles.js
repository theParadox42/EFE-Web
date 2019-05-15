var maps;
$.getJSON("/scripts/runtorocket/runmap.js", function(d){
    maps = d;
});
let obstacles = [];
let loadRun = {
    level: 0,
    maps: maps,
    current: {},
    map: "",
    load: function(){
        if(!this.maps[this.level]) return;
        this.current = this.maps[this.level];
        this.map = this.current.map;
        this.reload();
    },
    reload: function(){
        this.
    },
    next: function(){
        this.level ++;
        this.load();
    }
}
