import { apiCall } from './api.js';

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    apiCall("https://api.petfinder.com/v2/animals/"+ id, fillTable, "single");   
    $(".btn-adotar").on("click", function(){
        let idVerMais = $(this).attr("id");
        location.href="adotar.html?id="+id;
    });
 
});

function fillTable(dogInfo){
    
    let foto = dogInfo.photos[0];
    console.log(foto.small);

    $("#nome").text("Nome do Patudo: " + dogInfo.name);
    $("#link").html("<a href='" + dogInfo.url + "'>" + dogInfo.url + "</a>");
    $("#raca").text(dogInfo.breeds.primary);
    $("#idade").text(dogInfo.age);
    $("#genero").text(dogInfo.gender);
    $("#tamanho").text(dogInfo.size);
    $("#descricao").text(dogInfo.description);
    $('#foto').html('<img src="' + foto.small + '" alt="Animal Photo" width="100">');
}