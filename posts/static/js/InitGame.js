let dataWord = {};
function selectDificult(id){
    $.ajax({
        url: "/game/"+id,
        type: "GET",
    }).done((res) => {
        if(res.status){
            dataWord = {"word": res.word, "id_word": res.id_word}
            loadWord(res.word);
        }
    }).fail((err) => {
        console.log(err)
    }) ;
}