


let fecha = new Date();
let dia = fecha.getDate();
if(dia<10){
    dia = "0" + dia;
}
let mes = fecha.getUTCMonth() + 1;
if(mes<10){
    mes = "0" + mes;
}
let year = fecha.getUTCFullYear();


function date(){
    let txtFecha = document.getElementById("fecha");
    let textDate = `${dia}/${mes}/${year}`
    
    let txtHora = document.getElementById("hora");
    setInterval (() => {
        var tiempo = new Date();
        var hours = tiempo.getHours();
        var minutes = tiempo.getMinutes();
        var seconds = tiempo.getSeconds();
        if(seconds<10){
            seconds = `0${seconds}`;
        }
        if(minutes<10){
            minutes = `0${minutes}`;
        }
        if(hours<10){
            hours = `0${hours}`;
        }
        txtHora.innerHTML = `${hours}:${minutes}:${seconds}`;
    },1000)
   



    txtFecha.innerHTML = textDate;
}
date();



//traer el JSON
let linkFecha = `${year}-${mes}-${dia}`
function cargarJson(){
    fetch("https://api.covid19tracking.narrativa.com/api/"+linkFecha+"/country/mexico")
    //
    .then(response => response.json())
    .then(jsonCargado)
}





function jsonCargado(json){
    let confirmed = document.getElementById("confirmed");
    let deaths = document.getElementById("deaths");
    let confirmed_today = document.getElementById("confirmed_today");
    let deaths_today = document.getElementById("deaths_today");

    let confirmados = json.dates[linkFecha].countries.Mexico.today_confirmed;
    let muertes = json.dates[linkFecha].countries.Mexico.today_deaths;
    let confirmados_hoy = json.dates[linkFecha].countries.Mexico.today_new_confirmed;
    let muertes_hoy = json.dates[linkFecha].countries.Mexico.today_new_deaths;

    
    if(confirmados>1000){
        confirmados = Math.floor(confirmados / 1000) + "K ";
    }
    if(muertes>1000){
        muertes = Math.floor(muertes / 1000) + "K ";
    }
    if(confirmados_hoy>1000){
        confirmados_hoy = Math.floor(confirmados_hoy / 1000) + "K ";
    }
    if(muertes_hoy>1000){
        muertes_hoy = Math.floor(muertes_hoy / 1000) + "K ";
    }

    confirmed.innerHTML = confirmados;
    deaths.innerHTML = muertes;
    confirmed_today.innerHTML = confirmados_hoy;
    deaths_today.innerHTML = muertes_hoy;
}

cargarJson();

