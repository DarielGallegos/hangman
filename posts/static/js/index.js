let attempts = 6
let points = 0;
let basepoints = 100;
let multiplier = 1;
let lengthWord = 0;
let lengthWordGuessed = 0;

palabra = "ASTRO"
palabra = palabra.toUpperCase()
palabra = palabra.split("")

setDataHUD()

for (let i = 0; i < palabra.length; i++) {
    let contletter = document.createElement("section")
    let spacerLetter = document.createElement("div")
    if (palabra[i] === " ") {
        contletter.classList.add("spacer")
        spacerLetter.innerHTML = " "
    } else {
        lengthWord++
        spacerLetter.id = "letter" + i
        contletter.classList.add("letter")
    }
    contletter.appendChild(spacerLetter)
    document.getElementById("container-word").appendChild(contletter)
}

document.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        alert("Tecla Enter press");
    }
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        getLetter(e.key)
    }
});

function getLetter(letter) {
    if (lengthWord === lengthWordGuessed) {
        playSound(dataSounds[3]["id"])
        alert("Ganaste")
        return
    }
    if (attempts === 0) {
        playSound(dataSounds[2]["id"])
        alert("Perdiste")
        return
    }
    if (document.getElementById("key_" + letter.toLowerCase()).classList.contains("disabled")) {
        return
    }

    let letra = letter.toUpperCase()
    if (palabra.includes(letra)) {
        points += basepoints * multiplier
        multiplier = multiplier + 0.25
        playSound(dataSounds[1]["id"])
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i] === letra) {
                palabra[i] = ""
                document.getElementById("letter" + i).innerText = letra
                lengthWordGuessed++
                if (lengthWord === lengthWordGuessed) {
                    playSound(dataSounds[3]["id"])
                    showModal("../../static/assets/images/completed.svg", points);
                    return;
                }
            }
        }
        setDataHUD()
    } else {
        multiplier = 1
        attempts--
        changeImgBody(attempts)
        playSound(dataSounds[0]["id"])
        if (attempts === 0) {
            playSound(dataSounds[2]["id"])
            showModal("../../static/assets/images/failed.png", points);
            return;
        }
    }
    document.getElementById("key_" + letter).classList.add("disabled")
    setDataHUD()
}

function setDataHUD() {
    let hearts = document.getElementById("player-lives-value")
    hearts.innerHTML = "";

    for (let i = 0; i < attempts; i++) {
        hearts.innerHTML += "❤️";
    }
    document.getElementById("player-score-value").innerText = points
    //document.getElementById("player-lives-value").innerText = attempts
}

//contenido de los modales
var modalResultado = document.getElementById("modal");
var modalImg = document.getElementById("modal-img");
var modalPoints = document.getElementById("modal-points");
var closeModal = document.querySelector(".close");
var modalC = document.getElementById('categoryModal');
var closeCatg = document.querySelector(".close-catg");

function showModal(imgUrl, points) {
    modalResultado.style.display = "flex";
    modalImg.src = imgUrl;
    modalPoints.innerText = points;

    closeModal.onclick = function() {
        modalResultado.style.display = "none";
    }
}


//MODAL CATEGORIA
window.onload = function() {
    modalC.style.display = 'flex';

    closeCatg.onclick = function() {
        modalC.style.display = 'none';
    };
};
// Close
window.onclick = function(event) {
    if (event.target === modalResultado) {
        modalResultado.style.display = 'none';
    } else if (event.target === modalC) {
        modalC.style.display.none;
    }
};

document.getElementById("continue-button").addEventListener("click", () => {
    location.reload();
});
