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
    generarCombinacionColores();
    console.log(master)

    //2. Crea todas las filas según el número de intentos.
    crearFilas();
}

// Esta función crea las filas necesarias para el juego
function crearFilas() {
    let contenedorResultado = document.getElementById('Result');
    for (let i = 1; i <= MAX_INTENTOS; i++) {
        // Asignamos un id único a cada fila para poder acceder a cada una más adelante.
        let fila = document.createElement('div');
        fila.setAttribute("id", `row${i}`);
        fila.setAttribute("class", "w100 flex wrap");

        // Creamos los rectángulos para la selección del usuario.
        let divColores = document.createElement('div');
        divColores.setAttribute("class", "w80 flex wrap")
        for (let j = 1; j <= MAX_COMBI_COLORES; j++) {
            let divCuadrado = document.createElement('div');
            divCuadrado.setAttribute("class", "w25");
            let cuadradoColorUsuario = document.createElement('div');
            cuadradoColorUsuario.setAttribute("class", "celUserCombi flex");
            divCuadrado.appendChild(cuadradoColorUsuario);
            divColores.appendChild(divCuadrado);
        }

        // Creamos los circulos para las pistas.
        let divPistas = document.createElement('div');
        divPistas.setAttribute("class", "w20 flex wrap");
        for (let x = 1; x <= MAX_COMBI_COLORES; x++) {
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

// Esta función genera la combinación secreta de colores
function generarCombinacionColores() {
    for (let i = 1; i <= MAX_COMBI_COLORES; i++) {
        let random = numeroRandom(0, COLORS.length - 1)
        master.push(COLORS[random])
    }
    // Nos aseguramos de que por lo menos uno de los colores sea diferente al resto
    let repeticiones = comprobarRepeticiones(master);
    if(repeticiones>=MAX_COMBI_COLORES-1) {
        do {
        master[1]=COLORS[numeroRandom(0, COLORS.length - 1)];
        }while(master[1]===master[2]);
    }
}


/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha
introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function Comprobar() {
    // Limitamos el número de colores repetidos que puede introducir el usuario a a 3.
    let repeticiones = comprobarRepeticiones();
    if (repeticiones >= MAX_COMBI_COLORES-1) {
        modificarInfo("No puedes repetir más de 3 veces el mismo color.", "red");
        restablecerValores();
    }
    else {

        // El usuario tiene que introducir los 4 colores para hacer la comprobación.
        if (userCombi.length < MAX_COMBI_COLORES) {
            modificarInfo("Tienes que introducir los 4 colores antes de comprobar.", "red");
        }

        else {

            // Cuando se termine la partida el usuario ya no podrá seleccionar más colores.
            if (intento < MAX_INTENTOS && aciertos < MAX_COMBI_COLORES) {
                intento++
                actualizarFila();

                // Si el usuario ha acertado los 4 colores, gana.
                if (aciertos === MAX_COMBI_COLORES) {
                    hasGanado();
                    modificarInfo("Felicidades, has ganado!", "green");
                    mostrarCombinacionMaster();

                    // Si el usuario ha agotado todos los intentos, pierde.
                } else if (aciertos != MAX_COMBI_COLORES && intento >= 10) {
                    gameOver();
                    modificarInfo("GAME OVER. Has perdido!", "red");
                    mostrarCombinacionMaster();

                } else {
                    modificarInfo(`Intento ${intento}/${MAX_INTENTOS}: Has acertado ${aciertos} colores. Vuelve a intenarlo!`, "#1aa1f0");
                }

                mostrarCombinacionVentana();

                // Reseteamos los valores para el siguiente intento
                if (aciertos !== MAX_COMBI_COLORES) {
                    restablecerValores();
                }
            }
        }
    }
}

// Esta función actualiza la información de la ventana 'info'
function modificarInfo(texto, color) {
    let info = document.getElementById('info');
    info.textContent = texto;
    let colorInfo = info.parentNode;
    colorInfo.style.borderColor = color;
    colorInfo.style.backgroundColor = color;
}

// Esta función actualiza los colores y pistas de cada fila según la selección del usuario
function actualizarFila() {
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

}

// Esta función muestra la combinación secreta de colors en el master
function mostrarCombinacionMaster() {
    let masterElementoPadre = document.getElementById('master').children[0];
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        masterElementoPadre.children[i].children[0].setAttribute("id", master[i]);
    }
}

// Esta función muestra la combinación secreta de colors en la ventana emergente final
function mostrarCombinacionVentana() {
    let combinacionMasterPadreG = document.getElementById('result-ganado').children[0];
    let combinacionMasterPadreP = document.getElementById('result-perdido').children[0];

    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        combinacionMasterPadreG.children[i].children[0].setAttribute("id", master[i]);
        combinacionMasterPadreP.children[i].children[0].setAttribute("id", master[i]);
    }
}

// Esta función restablece los valores del intento realizado
function restablecerValores() {
    let userInputColor = document.getElementById('combiText');
    userInputColor.value = "";
    userCombi.length = 0;
    aciertos = 0;
}

// Esta función comprueba las repeticiones en la selección de colores del usuario
function comprobarRepeticiones(array=userCombi) {
    let repeticiones = 0;
    for (let i = 0; i < MAX_COMBI_COLORES - 1; i++) {
        if (array[i] === array[i + 1]) {
            repeticiones++
        }
    }
    return repeticiones;
}


/** Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores permitidos en la combinación. */
function añadeColor(color) {
    if (intento < MAX_INTENTOS && aciertos < MAX_COMBI_COLORES) {
        if (userCombi.length < MAX_COMBI_COLORES) {
            let userInputColor = document.getElementById('combiText');
            if (userCombi.length < 1) userInputColor.value += color
            else userInputColor.value += " - " + color
            userCombi.push(color);
        }
    }
}

/*-------------------------- Ventana emergente final ----------------------------*/
// Esta función muestra la ventana emergente final si se ha ganado
function hasGanado() {
    const hasGanado = document.getElementById("hasGanado");
    hasGanado.showModal();

    const intentosTotales = document.getElementById("intentos");
    intentosTotales.textContent = intento
    bloquearScroll();
}

// Esta función muestra la ventana emergente final si se ha perdido
function gameOver() {
    const gameOver = document.getElementById("gameOver");
    gameOver.showModal();
    bloquearScroll();
}

// Esta función cierra la ventana emergente
function closeModal(id) {
    const dialog = document.getElementById(id);
    dialog.close();
    document.body.classList.remove("bloquear-scroll");
}

// Esta función bloqueo el scroll de la página
function bloquearScroll() {
    window.scrollTo(0, 0);
    document.body.classList.add("bloquear-scroll");
}

