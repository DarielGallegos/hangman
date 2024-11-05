//Initialize sources to sounds effects
var resourcesPath = "/static/assets/sounds/";

var dataSounds = [
    {id: "error_sound", src: resourcesPath + "error.mp3"},
    {id: "success_sound", src: resourcesPath + "succes.mp3"},
    {id: "fail_sound", src: resourcesPath + "lose.mp3"},
    {id: "win_sound", src: resourcesPath + "wiiin.mp3"},
]

dataSounds.forEach(element => {
    createjs.Sound.registerSound(element.src, element.id);
});

function playSound(idSound){
    createjs.Sound.play(idSound);
}
