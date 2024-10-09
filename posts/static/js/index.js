let attempts = 6
let points = 0;
let basepoints = 100;
let multiplier = 1;
let lengthWord = 0;
let lengthWordGuessed = 0;

palabra = "Todos contra Seidy"
palabra = palabra.toUpperCase()
palabra = palabra.split("")

setDataHUD()

for(let i = 0; i < palabra.length; i++){
    let contletter = document.createElement("section")
    let spacerLetter = document.createElement("div")
    if(palabra[i] === " "){
        contletter.classList.add("spacer")
        spacerLetter.innerHTML = " "
    }else{
        lengthWord++
        spacerLetter.id = "letter" + i
        contletter.classList.add("letter")    
    }
    contletter.appendChild(spacerLetter)
    document.getElementById("container-word").appendChild(contletter)
}

document.addEventListener("keydown", (e) => {
    if(e.key === 'Enter'){
        alert("Tecla Enter press");
    }
    if(e.keyCode >= 65 && e.keyCode <= 90){
        getLetter(e.key)
    }
});

function getLetter(letter){
    if(lengthWord === lengthWordGuessed){
        alert("Ganaste")
        return
    }
    if(attempts === 0){
        alert("Perdiste")
        return
    }
    if(document.getElementById("key_"+letter.toLowerCase()).classList.contains("disabled")){
        return
    }
    
    let letra = letter.toUpperCase()
    if(palabra.includes(letra)){
        points += basepoints * multiplier
        multiplier = multiplier + 0.25
        for(let i = 0; i < palabra.length; i++){
            if(palabra[i] === letra){
                palabra[i] = ""
                document.getElementById("letter"+i).innerText = letra
                lengthWordGuessed++
                if(lengthWord === lengthWordGuessed){
                    alert("Ganaste")
                }            
            }
        }
        setDataHUD()
    }else{
        multiplier = 1
        attempts--
        changeImgBody(attempts)
        playSound(dataSounds[0]["id"])
        if(attempts === 0){
            alert("Perdiste")
        }
    }
    document.getElementById("key_"+letter).classList.add("disabled")
    setDataHUD()
}

function setDataHUD(){
    document.getElementById("player-score-value").innerText = points
    document.getElementById("player-lives-value").innerText = attempts
}