document.getElementById('logoutBtn').addEventListener('click', () => {
    $.ajax({
        url: '/logout',
        type: 'GET',
        data: null
    }).done((response) => {
        if(response.status){
            window.location.href='/'
        }
    });
});