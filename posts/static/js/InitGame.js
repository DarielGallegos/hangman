let modalCategory = document.getElementById('categoryModal');
let closeC = document.getElementById('closeC');

document.addEventListener("DOMContentLoaded", function () {
    const savedCategory = localStorage.getItem("selectedCategory");
    console.log("Categoría guardada:", savedCategory);

    if (savedCategory) {
        console.log("Cargando palabra de la categoría guardada:", savedCategory);
        newWord(savedCategory); 
    } else {
        modalCategory.style.display = 'flex'; 
    }
});


let dataWord = {};

let modalOptions = document.getElementById('modalOptions');
let modalClose = document.getElementById('modalClose');

// Elementos de texto y botones de los modales
let optionsText = document.getElementById('optionsText');
let optionsInfo = document.getElementById('optionsInfo');
let closeText = document.getElementById('closeText');
let closeInfo = document.getElementById('closeInfo');
let confirmYes = document.getElementById('confirmYes');
let confirmNo = document.getElementById('confirmNo');
let closeConfirm = document.getElementById('closeConfirm');

// Para seleccionar la categoria desde el boton  "Categorias"
document.getElementById('cambiarCatg').addEventListener("click", () => {
    modalCategory.style.display = 'flex';
    closeC.style.display = 'flex';
});

closeC.addEventListener("click", () => {
    modalCategory.style.display = 'none';
    closeC.style.display = 'none';
});

document.addEventListener("DOMContentLoaded", () => {
    closeC.style.display = 'none';
});

function selectDificult(id) {
    $.ajax({
        url: "/game/" + id,
        type: "GET",
    }).done((res) => {
        if (res.status) {
            localStorage.setItem("selectedCategory", id);
            reset();
            palabra = res.word.toUpperCase();
            dataWord = { "word": res.word, "id_word": res.id_word };
            loadWord(res.word);
            modalCategory.style.display = 'none';
            showOptionsModal("¿Desea guardar la categoría seleccionada para futuras partidas?", "No se te pedirá elegir una categoría nuevamente, a menos que desees cambiarla desde el menú de opciones.", id);
        } else {
            console.log("Error al obtener la palabra");
        }
    }).fail((err) => {
        console.log(err);
    });
}

// Opciones despues de seleccionar la categoria
function showOptionsModal(text, info, categoryId) {
    optionsText.textContent = text;
    optionsInfo.textContent = info;
    modalOptions.style.display = 'block';

    confirmYes.onclick = function () {
        saveCategory(categoryId, true);
    };
    confirmNo.onclick = function () {
        saveCategory(null, false); 
    };

}

// modal para confirmar el mensaje y cerrar
function showModalClose(text, info) {
    modalOptions.style.display = 'none';
    closeText.textContent = text;
    closeInfo.textContent = info;
    modalClose.style.display = 'flex';

    closeConfirm.onclick = function () {
        modalClose.style.display = 'none';
    };
}

// Función para guardar o no la categoria
function saveCategory(categoryId, success) {
    if (success && categoryId) {
        localStorage.setItem("selectedCategory", categoryId);
        showModalClose("Guardado", "Su categoría se ha guardado con éxito.");
    } else {
        localStorage.removeItem("selectedCategory"); 
        showModalClose(
            "No Guardado",
            "Su categoría no se ha guardado.",
            true
        );
    }
}

// Al finalizar la partida muestra el modal si no hay una categoria guardada
function endGame() {
    const savedCategory = localStorage.getItem("selectedCategory");
    if (!savedCategory) {
        modalCategory.style.display = 'flex';
    } else {
        console.log("Categoría guardada, lista para continuar.");
    }
}

function newWord(categoryId) {
    $.ajax({
        url: "/game/" + categoryId,
        type: "GET",
    })
        .done((res) => {
            if (res.status) {
                reset();
                palabra = res.word.toUpperCase();
                dataWord = { word: res.word, id_word: res.id_word };
                loadWord(res.word);

                console.log("Nueva palabra cargada:", palabra);
                console.log("Intentos restantes:", attempts);
                modalCategory.style.display = "none";
            } else {
                console.log("Error al obtener la palabra.");
            }
        })
        .fail((err) => {
            console.log("Error en la solicitud AJAX:", err);
        });

}

function reset() {
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

}
