function communityLevels(){
    background(200);

}

// JSON loading
var communityLevelsPath = "https://escape-from-earth.herokuapp.com/levels";
$.getJSON(communityLevelsPath, function(data, err){
    console.log(data);
    console.log(err);
}, function(){
    console.log("...");
}).catch(function(e){
    communityLevelsPath = "/scripts/levelbuilder/stashedcommunitylevels.json";
    $.getJSON(communityLevelsPath, function(data){
        console.log("Failed to load external resource, stuck with local")
        communityLevels.level = data;
    }).catch(function(e){
        console.log("Failed to load any community levels")
    })
});
