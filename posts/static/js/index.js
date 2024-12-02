let attempts = 6
let points = 0;
let basepoints = 100;
let multiplier = 1;
let lengthWord = 0;
let lengthWordGuessed = 0;
let palabra = null;
let palabraFin = null;

function loadWord(word) {
    palabraFin = word.toUpperCase();
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
                    showModalResult("../../static/assets/images/completed.svg", points, "Acertaste la palabra:" + "\n" + palabraFin);
                    saveScore()
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
            showModalResult("../../static/assets/images/failed.png", points, "La palabra era: " + "\n" + palabraFin);
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
var modalWord = document.getElementById('modal-word');

// Variables Modal de Categoria y demas...
var modalC = document.getElementById('categoryModal'); 
var modalOption = document.getElementById('modalOption'); 
var modalQuest = document.getElementById('text');
var modalInfo = document.getElementById('info');

// Variables del Modal Tabla de Posiciones
var positions = document.getElementById('positions');
var closeM = document.getElementById('closeM');

// Modal Resumen
function showModalResult(imgUrl, points, word) {
    modalResultado.style.display = "flex";
    modalImg.src = imgUrl;
    modalPoints.innerText = points;
    modalWord.innerText = word;
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
    if (!isDataLoaded) {
        showPositions();
        isDataLoaded = true; // Marca los datos como cargados
    } else {
        console.log("Los datos ya están cargados.");
    }
});

let isDataLoaded = false; // Controla si 

// Funcion Para Ver Tabla de Posiciones 
function showPositions() {
   
    $.ajax({
        url: '/get_positions/',
        type: 'GET'
    }).done((response) => {
        
        let table = document.getElementById('content-table');
        table.innerHTML = '';
        console.log(response);

        response.scores.forEach((score, index) => {
            let tr = document.createElement('tr');
            let th1 = document.createElement('th');
            let th2 = document.createElement('th');
            let th3 = document.createElement('th');
            
            switch(index){
                case 0:
                    th1.innerText = "🥇";
                    break;
                case 1:
                    th1.innerText = "🥈";
                    break;
                case 2:
                    th1.innerText = "🥉";
                    break;
                default:
                    th1.innerText = index+1;
                    break;
            }
            th2.innerText = score[0];
            th3.innerText = score[1];

            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);

            table.appendChild(tr);
        });
        positions.style.display = 'flex';
    }).fail((error) => {
        console.error(error)
    })
}
// Cerrar el Modal de Posiciones
closeM.onclick = function () {
    positions.style.display = 'none';
    isDataLoaded = false;
};

// Cerrar el Modal de Posiciones Presionando Cualquier Lugar Fuera de el
window.onclick = function (event) {
    if (event.target === positions) {
        positions.style.display = 'none';
        isDataLoaded = false;
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
