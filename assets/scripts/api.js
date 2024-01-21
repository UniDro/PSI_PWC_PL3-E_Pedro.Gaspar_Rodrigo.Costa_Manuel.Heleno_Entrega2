export function apiCall(url, callback,option){
    //Mudar token com o comando curl!
    //COMANDO CURL: curl -d "grant_type=client_credentials&client_id=7B4hc8slT6zQft38GlPkfWTC3HsQmFR1n8yERvad3Mk3vRCpTx&client_secret=U57BXfccqMKcTulg4hgcd4QtpWbSaJNj3RxCGdaQ" https://api.petfinder.com/v2/oauth2/token
    let authorizationToken ="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3QjRoYzhzbFQ2elFmdDM4R2xQa2ZXVEMzSHNRbUZSMW44eUVSdmFkM01rM3ZSQ3BUeCIsImp0aSI6ImZlNGUyNDQ3MjdhMDFmNDQ0YjAwNzhiYTY2MjFlMjA2YmM2ODcxOGM1OTA5YWI5ZjUwNjQ5ZDkyMzIwMDVkZWI0ODc5ZDNiOWY0ZjYyYTRiIiwiaWF0IjoxNzA1ODc4OTA2LCJuYmYiOjE3MDU4Nzg5MDYsImV4cCI6MTcwNTg4MjUwNiwic3ViIjoiIiwic2NvcGVzIjpbXX0.T6S1YEPSME9dYER3varVzEULm-NbcaHtrJhT0KzVzjPTfUJI2rKpxFK3-Wiz-hkifYHccDWSsppxS0QiTpU0pd1JXQNejyNiT1DJnyipN1_ngQL4kv1qGWvWSUdf3noVJUatOtws3maamSOcmuLxCBz24YeW_VuMtElq3S5yBUJdSWDUx6m9W_X5xVbjUF3-hkh1ZdwSuwzYGeIngPhYUX8obutL-MJ4vc6L6ZQsr6JYdBj_BFb9xUs1DdxkYA4W6dmcKPO4U-V-HQRmfj2xSuORYCZuNyQ_pSuwrUleyM3D4u6l68hBLkzvPmWdBBGcivhtATZirYHHtBgrVxqJBA";
    var settings = {
        "url": url,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + authorizationToken
        },
      };
      
      $.ajax(settings).done(function (dogInfo) {
        console.log("DENTRO");
            if (option == "single"){
                callback(dogInfo.animal);
            }else{
                callback(dogInfo.animals);
            }
            
        
        
      });
}
