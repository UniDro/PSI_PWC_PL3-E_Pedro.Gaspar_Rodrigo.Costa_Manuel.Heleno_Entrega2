import { apiCall } from './api.js';

$(document).ready(function(){
    getDogData();
    
    $(".dog-display").on("click", ".btn-icon-fav", function(){
    console.log("botão clicado");
    let dogId = $(this).attr("id");
    localStorage.setItem(dogId, dogId)
    $(this).removeClass('btn-icon-fav').addClass('btn-icon-defav');
    $(this).find('img').remove()
    $(this).append('<img src="assets/imgs/fav-full.svg" alt="icon favorito" class="img-fluid"></img>');
  });
  
  $(".dog-display").on("click", ".btn-icon-defav", function(){
    console.log("botão defav clicado");
    let dogId = $(this).attr("id");
    
    localStorage.removeItem(dogId, dogId)
    $(this).removeClass('btn-icon-defav').addClass('btn-icon-fav');
    $(this).find('img').remove()
    $(this).append('<img src="assets/imgs/fav-empty.svg" alt="icon favorito" class="img-fluid"></img>');
  });

  $(".dog-display").on("click", ".btn-ver-mais", function(){
    let idVerMais = $(this).attr("id");
    location.href="vermais.html?id="+idVerMais;
  })
})

function getDogData(){
    const favoritos = getFavoritosArray();
    let url = "https://api.petfinder.com/v2/animals/"
    
    if (favoritos != false){

        $.each(favoritos, function(index, dogId){
            apiCall(url+dogId ,displayFavoritos, "single");
        })
        
    }else{
        alert("Não existem Favoritos");
    }
}

function getFavoritosArray(){
    let arrayDogId = [];
    let isFavoritosEmpty = true;
    for(let key in localStorage){
        if (isFinite(key)){
            isFavoritosEmpty = false;
            arrayDogId.push(key)

        }
    }
    if(isFavoritosEmpty){
        return false;
    }else{
        return arrayDogId;
    }
}

function displayFavoritos(dogInfo){
    console.log(dogInfo);
    let dogId = dogInfo.id;
    let foto = dogInfo.photos[0];
    let card = 
    `        <div class = "col-md-3">
                <div class="card animal-card">
                    <img class="card-img-top animal-img" src="${foto.medium}" alt="Animal">
                    <div class="card-body">
                        <div class="row">  
                            <div class="col-9">
                                <h5 class="card-title">${dogInfo.name}</h5>
                            </div>
                            <div class="col-3">
                                <button class="btn-icon-defav" id="${dogId}">
                                  <img src="../assets/imgs/fav-full.svg" alt="icon favorito" class="img-fluid"></img>
                                </button>
                            </div>
                        </div>
                        <p class="card-text">Alguma informação relativa a este pequeno patudo, lindo e fofo!</p>
                        <div class="text-center">
                            <button type="button" class="btn btn-primary btn-ver-mais" id="${dogId}">Ver mais</button>
                        </div>
                    </div>
                </div>
             </div>   
    `;
    $(".dog-display").append(card);
}

