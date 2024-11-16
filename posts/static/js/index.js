let attempts = 6
let points = 0;
let basepoints = 100;
let multiplier = 1;
let lengthWord = 0;
let lengthWordGuessed = 0;
let palabra = null;

function loadWord(word) {
    palabra = word.toUpperCase()
    palabra = palabra.split("")
    setDataHUD()
    document.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') {
        }
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            getLetter(e.key)
        }
    });
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
}

function getLetter(letter) {

    if (lengthWord === lengthWordGuessed) {
        playSound(dataSounds[3]["id"])
        return
    }
    if (attempts === 0) {
        playSound(dataSounds[2]["id"])
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
                    showModalResult("../../static/assets/images/completed.svg", points);
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
            showModalResult("../../static/assets/images/failed.png", points);
            setDataHUD()
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
    if (attempts === 0) {
        hearts.innerHTML = "💔";
    }
    document.getElementById("player-score-value").innerText = points
    //document.getElementById("player-lives-value").innerText = attempts
}

//Variables del Modal Resumen de la Partida
var modalResultado = document.getElementById("modal");
var modalImg = document.getElementById("modal-img");
var modalPoints = document.getElementById("modal-points");
var closeModal = document.getElementById('continue-button');

// Variables Modal de Categoria y demas...
var modalC = document.getElementById('categoryModal'); 
var modalOption = document.getElementById('modalOption'); 
var modalQuest = document.getElementById('text');
var modalInfo = document.getElementById('info');

// Variables del Modal Tabla de Posiciones
var positions = document.getElementById('positions');
var closeM = document.getElementById('closeM');

// Modal Resumen
function showModalResult(imgUrl, points) {
    modalResultado.style.display = "flex";
    modalImg.src = imgUrl;
    modalPoints.innerText = points;
}


closeModal.onclick = function () {
    positions.style.display = 'none';
};

// Mostrar Modal Categorias
/*window.onload = function () {
    modalC.style.display = 'flex';
};*/

// Boton Continuar Despues del Resumen
document.getElementById("continue-button").addEventListener("click", () => {
    location.reload();
});

// Funcionamiento de los botones
document.getElementById('reiniciar').addEventListener("click", () => {
    resetGame();
});

// Mostrar Tabla de Posiciones
document.getElementById('tablaPosiciones').addEventListener("click", () => {
    showPositions();
});

// Funcion Para Ver Tabla de Posiciones 
function showPositions() {
    positions.style.display = 'flex';
}
// Cerrar el Modal de Posiciones
closeM.onclick = function () {
    positions.style.display = 'none';
};

// Cerrar el Modal de Posiciones Presionando Cualquier Lugar Fuera de el
window.onclick = function (event) {
    if (event.target === positions) {
        positions.style.display = 'none';
    }
};

// Mostrar modal para cambiar la categoria
document.getElementById('cambiarCatg').addEventListener("click", () => {
    modalC.style.display = 'flex';
});

// Funcion para reiniciar el juego 
function resetGame() {
    attempts = 6;
    points = 0;
    multiplier = 1;
    lengthWord = 0;
    lengthWordGuessed = 0;
    palabra = null;

    document.getElementById("container-word").innerHTML = "";
    document.getElementById("player-lives-value").innerHTML = "";
    document.getElementById("player-score-value").innerText = points;

    changeImgBody(6);

    const keys = document.querySelectorAll("[id^=key_]");
    keys.forEach(key => key.classList.remove("disabled"));

    // Obtener el id de la categoria 
    const categoryId = localStorage.getItem("selectedCategory");

    if (categoryId) {
        console.log("Cargando nueva palabra para la categoría:", categoryId);
        newWord(categoryId);
    } else {
        console.log("No hay categoría seleccionada. Mostrando el modal.");
        modalCategory.style.display = "flex";
    }
}
