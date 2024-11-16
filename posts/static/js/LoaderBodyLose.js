//Array Img To Load Body
let imgPathSource = "/static/assets/images/"
let dataBody = [
    {src: imgPathSource + "Fin.svg"},
    {src: imgPathSource + "Piernas.svg"},
    {src: imgPathSource + "Brazos.svg"},
    {src: imgPathSource + "Pecho.svg"},
    {src: imgPathSource + "Cabeza.svg"},
    {src: imgPathSource + "Base.svg"},
    {src: imgPathSource + "hi1.gif"},
]

let imgHTML = document.getElementById("img-hangman")

function changeImgBody(index){
    imgHTML.src = dataBody[index].src
}