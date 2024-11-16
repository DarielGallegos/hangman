const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});


document.getElementById('loginBtn').addEventListener('click', (e) => {
    e.preventDefault();
    access();
});

function access() {
    const user = document.getElementById('txtUser').value;
    const password = document.getElementById('txtPasswd').value;
    if (user.trim() === '' || password.trim() === '') {
        return;
    }

    $.ajax({
        url: '/login/',
        type: 'POST',
        data: {
            user: user,
            password: password
        }
    }).done((response) => {
        if (response.status) {
            window.location.href = response.redirect_url;
        } else {
            showAlert();
        }
    }).fail((error) => {
        console.error(error);
    });

}

document.getElementById('registerBtn').addEventListener('click', (e) => {
    e.preventDefault();
    register();
});

function register() {
    const name = document.getElementById('txtName').value;
    const lastName = document.getElementById('txtLastName').value;
    const user = document.getElementById('txtUserR').value;
    const passwd = document.getElementById('txtPasswdR').value;
    const confirmPass = document.getElementById('txtPassCR').value;

    if (name.trim() === '' || lastName.trim() === '' || user.trim() === '' || passwd.trim() === '') {
        showRegister("../../static/assets/images/error.png", "Por favor llene todos los campos.");
        return;
    }
    if(passwd !== confirmPass){
        showRegister("../../static/assets/images/error.png", "Las contraseñas no coinciden.");
        return;
    }
    $.ajax({
        url: '/register/',
        type: 'POST',
        data: {
            nombre: name,
            apellido: lastName,
            user: user,
            password: passwd
        }
    }).done((response) => {
        if (response.status) {
            showRegister("../../static/assets/images/done1.png", "Registro exitoso.", true);

        } else {
            showRegister("../../static/assets/images/error.png", "El usuario ya existe.");

        }
    }).fail((error) => {
        console.error("Error en la solicitud: ", error);
        showRegister("../../static/assets/images/error.png", "Hubo un error en el registro. Intente de nuevo.");
    })
}

// Variables de Registro
const success = document.getElementById('registroExitoso');
const aceptR = document.getElementById('aceptarR');
const statusR = document.getElementById('statusR');
const imgStatusR = document.getElementById('imgStatus');

// Variables Login
const alert = document.getElementById('accesoDenegado');
const closeAlert = document.getElementById('aceptarA');

// Funcion para mostrar los mensajes en el registro
function showRegister(img, status, reload=false) {
    success.style.display = "flex";
    statusR.innerText = status;
    imgStatusR.src = img;
    
    aceptR.onclick = function () {
        success.style.display = "none";
        if(reload){
            window.location.reload();
        }
    }
}

// Funcion para mostrar mensaje de Acceso Denegado 
function showAlert() {
    alert.style.display = "flex";

    closeAlert.onclick = function () {

        location.reload();
        alert.style.display = "none";
    }
}