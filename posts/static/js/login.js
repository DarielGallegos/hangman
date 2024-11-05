const container = document.querySelector('.container');
const signUpLink = document.querySelector('.signUpLink');
const signInLink = document.querySelector('.signInLink');


signUpLink.addEventListener('click', () => {
    container.classList.add('active'); // Añade la clase 'active' para ir al formulario de registro
});

signInLink.addEventListener('click', () => {
    container.classList.remove('active'); // Quita la clase 'active' para volver al formulario de login
});

document.getElementById('loginBtn').addEventListener('click', (e) => {
    e.preventDefault();
    access();
});

function access(){
    const user = document.getElementById('txtUser').value;
    const password = document.getElementById('txtPasswd').value;
    if(user.trim() === '' || password.trim() === ''){
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
        if(response.status){
            window.location.href = response.redirect_url;          
        }
    }).fail((error) => {
        console.error(error);
    });

}
