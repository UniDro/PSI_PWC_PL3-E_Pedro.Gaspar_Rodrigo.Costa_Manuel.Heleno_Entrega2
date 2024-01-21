import { apiCall } from './api.js';

function isDogFavorite(dogId){
  if(dogId == localStorage.getItem(dogId)){
    return true;
  }
  return false;
}

$(document).ready(function() {
  apiCall("https://api.petfinder.com/v2/animals?type=dog&sort=random&limit=3", displayDogs, "multiple");
  //Remover e adicionar favoritos
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
});

function displayDogs(dogInfo){
  $.each(dogInfo, function (index ,dogInfo){
    console.log(dogInfo);
    let favIcon = "assets/imgs/fav-empty.svg";
    let btn = "btn-icon-fav";
    try {
    console.log(dogInfo);
    let dogId = dogInfo.id;
    console.log(dogId);
    
    let foto = dogInfo.photos[0];
    console.log(foto);
    if (isDogFavorite(dogId)){
      alert("i'm here");
      favIcon = "assets/imgs/fav-full.svg";
      btn = "btn-icon-defav"
    }
    console.log("favicon em baixo")
    console.log(favIcon);
    let card = 
    `        <div class = "col-md-4">
                <div class="card animal-card">
                    <img class="card-img-top animal-img" src="${foto.medium}" alt="Animal">
                    <div class="card-body">
                        <div class="row">  
                            <div class="col-9">
                                <h5 class="card-title">${dogInfo.name}</h5>
                            </div>
                            <div class="col-3">
                                <button class="${btn}" id="${dogId}">
                                  <img src="${favIcon}" alt="icon favorito" class="img-fluid"></img>
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
    } catch (error) {
      console.log("Um dos cães não tinha imagem! Em fim...");
      console.log(error);
    }

  });
}