// LOGOUT 
const options = document.getElementById('logoutModal');
const yes = document.getElementById('yes');
const no = document.getElementById('no');

function showOptions() {
    options.style.display = "flex";
}

document.getElementById('logoutBtn').addEventListener('click', showOptions);

yes.addEventListener('click', () => {
    $.ajax({
        url: '/logout',
        type: 'GET',
        data: null
    }).done((response) => {
        if (response.status) {
            options.style.display = 'none';
            localStorage.removeItem("selectedCategory");
            window.location.href = '/';
        }
    });
});

no.addEventListener('click', () => {
    options.style.display = "none";
});