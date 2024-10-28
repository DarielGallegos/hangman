const container = document.querySelector('.container');
const signUpLink = document.querySelector('.signUpLink');
const signInLink = document.querySelector('.signInLink');


signUpLink.addEventListener('click', () => {
    container.classList.add('active'); // Añade la clase 'active' para ir al formulario de registro
});

signInLink.addEventListener('click', () => {
    container.classList.remove('active'); // Quita la clase 'active' para volver al formulario de login
});
