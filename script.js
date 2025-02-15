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
    for (let i = 1; i <= 4; i++) {
        let random = numeroRandom(0, COLORS.length - 1)
        master.push(COLORS[random])
    }
    console.log(master)

    //2. Crea todas las filas según el número de intentos.
    let contenedorResultado = document.getElementById('Result');
    for (let i = 1; i <= MAX_INTENTOS; i++) {
        let fila = document.createElement('div');
        fila.setAttribute("id", `row${i}`);
        fila.setAttribute("class", "w100 flex wrap");

        let divColores = document.createElement('div');
        divColores.setAttribute("class", "w80 flex wrap")
        for (let j = 1; j <= 4; j++) {
            let divCuadrado = document.createElement('div');
            divCuadrado.setAttribute("class", "w25");
            let cuadradoColorUsuario = document.createElement('div');
            cuadradoColorUsuario.setAttribute("class", "celUserCombi flex");
            divCuadrado.appendChild(cuadradoColorUsuario);
            divColores.appendChild(divCuadrado);
        }

        let divPistas = document.createElement('div');
        divPistas.setAttribute("class", "w20 flex wrap");
        for (let x = 1; x <= 4; x++) {
            let divCirculo = document.createElement('div');
            divCirculo.setAttribute("class", "w50 flex center");
            let circulosPistas = document.createElement('div');
            circulosPistas.setAttribute("class", "cercleResult flex");
            divCirculo.appendChild(circulosPistas);
            divPistas.appendChild(divCirculo);
        }

        fila.appendChild(divColores);
        fila.appendChild(divPistas);

        contenedorResultado.appendChild(fila);
    }
}

function numeroRandom(min, max) {
    let numeroRandom = parseInt(Math.random() * (max - min + 1) + min);
    return numeroRandom;

}


/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha
introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function Comprobar() {
    if(userCombi.length<4) {
        let info = document.getElementById('info');
        info.textContent = "Tienes que introducir los 4 colores antes de comprobar.";
        let colorInfo = info.parentNode
        colorInfo.style.borderColor = "red";
        colorInfo.style.backgroundColor = "red";
    }

    else {


    if (intento < 10 && aciertos < 4) {

        intento++

        let filaPadre = document.getElementById(`row${intento}`);
        let contenedorColores = filaPadre.children[0];
        let contenedorPistas = filaPadre.children[1];
        for (let i = 0; i < MAX_COMBI_COLORES; i++) {
            let cuadrado = contenedorColores.children[i];
            cuadrado.children[0].style.backgroundColor = userCombi[i];

            let circulo = contenedorPistas.children[i];

            if (userCombi[i] === master[i]) {
                aciertos++
                circulo.children[0].style.backgroundColor = BLACK;
            } else {
                if (master.includes(userCombi[i])) {
                    circulo.children[0].style.backgroundColor = WHITE;
                } else {
                    circulo.children[0].style.backgroundColor = GREY;
                }
            }
        }

    

    let info = document.getElementById('info');
    let masterElementoPadre = document.getElementById('master').children[0];
    if (aciertos === 4) {
        //alert("Felicidades, has ganado!")
        info.textContent = "Felicidades, has ganado!";
        hasGanado();

        let colorInfo = info.parentNode
        colorInfo.style.backgroundColor = "green";
        colorInfo.style.borderColor = "green";


        for (let i = 0; i < MAX_COMBI_COLORES; i++) {
            //masterElementoPadre.children[i].children[0].style.backgroundColor = master[i];

            masterElementoPadre.children[i].children[0].setAttribute("id",master[i]);
        }

    } else if (aciertos != 4 && intento >= 10) {
        //alert("Has consumido los 10 intentos disponibles. Has perdido!")
        info.textContent = "GAME OVER. Has perdido!";
        gameOver();
        let colorInfo = info.parentNode
        colorInfo.style.borderColor = "red";
        colorInfo.style.backgroundColor = "red";
        for (let i = 0; i < MAX_COMBI_COLORES; i++) {
            //masterElementoPadre.children[i].children[0].style.backgroundColor = master[i]; 

            masterElementoPadre.children[i].children[0].setAttribute("id",master[i]);
        }


    } else {
        info.textContent = `Intento ${intento}/${MAX_INTENTOS}: Has acertado ${aciertos} colores. Vuelve a intenarlo!`
        let colorInfo = info.parentNode
        colorInfo.style.borderColor = "#1aa1f0";
        colorInfo.style.backgroundColor = "#1aa1f0";
    }

   
    let combinacionMasterPadreG = document.getElementById('result-ganado').children[0];
    let combinacionMasterPadreP = document.getElementById('result-perdido').children[0];



    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        //masterElementoPadre.children[i].children[0].style.backgroundColor = master[i]; 

        combinacionMasterPadreG.children[i].children[0].setAttribute("id",master[i]);
        combinacionMasterPadreP.children[i].children[0].setAttribute("id",master[i]);
    }
        


    //console.log("Master:" + master)
    //console.log("User combi:" + userCombi)
    //console.log("Master igual a user combi?" + master === userCombi)
    //console.log("Intentos:" + intento)
    //console.log("Aciertos:" + aciertos)

    if (aciertos !== 4) {
        let userInputColor = document.getElementById('combiText');
        userInputColor.value = "";
        userCombi.length = 0;
        aciertos = 0;
    }
}
}

}

/** Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores permitidos en la combinación. */
function añadeColor(color) {

    if (intento < 10 && aciertos < 4) {

        if (userCombi.length < MAX_COMBI_COLORES) {

            let userInputColor = document.getElementById('combiText');
            if (userCombi.length < 1) userInputColor.value += color
            else userInputColor.value += " - " + color

            userCombi.push(color);

        }

    }

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

const SHOW_COMBINATION = `<div class="w100 flex wrap center">
            <div class="w100 flex wrap">
                <div class="w25">
                    <div class="cercleResult flex"></div>
                </div>
                <div class="w25">
                    <div class="cercleResult flex"></div>
                </div>
                <div class="w25">
                    <div class="cercleResult flex"></div>
                </div>
                <div class="w25">
                    <div class="cercleResult flex"></div>
                </div>
            </div>
        </div>`;



/*-------------------------- Extra ----------------------------*/
function hasGanado() {
    const hasGanado = document.getElementById("hasGanado")
    hasGanado.showModal()

    const intentosTotales = document.getElementById("intentos")
    intentosTotales.textContent = intento
    
}

function gameOver() {
    const gameOver = document.getElementById("gameOver")
    gameOver.showModal()

}

function closeModal(id) {
    const dialog = document.getElementById(id)
    dialog.close()
    document.body.classList.remove("remove-scrolling"); 
}

