//Declaración de constantes.
const MAX_INTENTOS = 10;
const MAX_COMBI_COLORES = 4;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const WHITE = "white";
const BLACK = "black";


//Declaración de variables globales.
const master = [];
const userCombi = [];
var intento = 0;
var aciertos = 0;

function init() {
    //1. Genera el código random del master
    //console.log(random)
    for(let i = 1; i<=4; i++) {
        let random  = numeroRandom(0,COLORS.length-1)
        master.push(COLORS[random])
    }
    console.log(master)

    //2. Crea todas las filas según el número de intentos.
    let contenedorResultado = document.getElementById('Result');
    //for(let i = 1; i<=MAX_INTENTOS;i++){
        let fila = document.createElement('div');
        fila.setAttribute("class","w100 flex wrap");

        let divColores = document.createElement('div');
        divColores.setAttribute("class","w75 flex wrap")
        for(let j = 1; j<=4; j++) {
        let divCuadrado = document.createElement('div');
        divCuadrado.setAttribute("class","w25");
        let cuadradoColorUsuario = document.createElement('div');
        cuadradoColorUsuario.setAttribute("class","celUserCombi flex");
        divCuadrado.appendChild(cuadradoColorUsuario);
        divColores.appendChild(divCuadrado);
        }

        let divPistas = document.createElement('div');
        divPistas.setAttribute("class","w25 flex wrap");
        for (let x = 1; x<=4; x++) {
            let divCirculo = document.createElement('div');
            divCirculo.setAttribute("class","w50 h40");
            let circulosPistas = document.createElement('div');
            circulosPistas.setAttribute("class", "cercleResult flex");
            divCirculo.appendChild(circulosPistas);
            divPistas.appendChild(divCirculo);
        }
        

        //cuadradoColorUsuario.setAttribute("id",`i${i}c{${j}`)

        
        fila.appendChild(divColores);
        fila.appendChild(divPistas);

        contenedorResultado.appendChild(fila);



    //}
}

function numeroRandom(min, max) {
    let numeroRandom = parseInt(Math.random() * (max - min + 1) + min);
    return numeroRandom;

}



/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha
introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function Comprobar() {
}

/** Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores permitidos en la combinación. */
function añadeColor(color) {

    if(userCombi.length<MAX_COMBI_COLORES) {

    let userInputColor = document.getElementById('combiText');
    if(userCombi.length<1) userInputColor.value+= color
    else userInputColor.value += " - " + color

    userCombi.push(color);

    }

    //console.log(userCombi)

}


/** Template con el código HTML que corresponde a cada fila de juego/intento. */
const ROW_RESULT = `<div class="rowResult w100 flex wrap">
    <div class="rowUserCombi w75 flex wrap">
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
    </div>alis/Mastermind_CODIGO
    <div class="rowCercleResult w25 flex wrap center">
       <div class="w40 h40">
            <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
    <div>
</div>`;