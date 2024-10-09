//Initialize sources to sounds effects
var resourcesPath = "./static/assets/sounds/";

var dataSounds = [
    {id: "error_sound", src: resourcesPath + "error-letter.mp3"},
]

dataSounds.forEach(element => {
    createjs.Sound.registerSound(element.src, element.id);
});

function playSound(idSound){
    createjs.Sound.play(idSound);
}
