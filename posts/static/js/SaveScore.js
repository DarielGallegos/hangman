function saveScore(){
    $.ajax({
        type: 'POST',
        url: '/save_score/',
        data: {
            attemps: attempts,
            attemps_err: (6 - attempts),
            points: points,
            id_word: dataWord['id_word']
        }
    }).done((response) => {
        console.log(response)
    }).fail((error) => {
        console.error(error)
    })    
}
