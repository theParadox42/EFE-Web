var maps;
$.getJSON("/scripts/runtorocket/runmap.js", function(d){
    maps = d;
});
let loadRun = {
    level: 0,
    maps:
    current: {},
    load: function(){
        this.current = d[level];
        this.reload();
    },
    reload: function(){

    }
}
