// -- Declaracion de variables globales --
let numeroSecreto;
let cantIntentos;
let listaNumerosSorteados = [];
let numeroFinal = 5;
let cantJuegos = 1; 
let cantMaxJuegos = 3;  // Hasta 3 juegos consecutivos como maximo puede jugar el usuario
let existenNumerosDisponibles = true;


console.log(`Cantidad de juegos: ${cantJuegos}`);

// -- Llamado de funciones  --
condicionesIniciales();


// -- Declaracion de funciones  --

// Funciones vinculadas con elementos del formulario 

// Funcion vinculada con el boton "Intentar"
function verificarIntento(){
    let numeroUsuario = parseInt(document.getElementById('inputUsuario').value);

    if(numeroUsuario == numeroSecreto){
        asignarTextoElementoHTML('p',`Felicidades, acertaste el numero secreto en ${cantIntentos} ${cantIntentos == 1 ? 'intento' : 'intentos'}` );
        // Remover el atributo 'disabled' del boton "Nuevo Juego", el cual inicialmente se encuentra en 'disabled'
        document.getElementById('reiniciar').removeAttribute('disabled');
        // Añadir atributo 'disabled' en el boton "Intentar" después de acertar el número secreto.
        document.getElementById('intentar').setAttribute('disabled', true);

    } else{
        if(numeroUsuario > numeroSecreto){
            asignarTextoElementoHTML('p','El numero secreto es menor');
        } else{
            asignarTextoElementoHTML('p','El numero secreto es mayor');
        }
        cantIntentos++;
        limpiarInputUsuario();
    }


}

// Funcion vinculada con el boton "Nuevo juego"
function reiniciarJuego(){

    cantJuegos++;
    console.log(`Cantidad de juegos: ${cantJuegos}`);

    if(cantJuegos > cantMaxJuegos){
        asignarTextoElementoHTML('p', `Alcanzaste la cantidad máxima de ${cantMaxJuegos} juegos consecutivos permitidos por usuario`);
        document.getElementById('reiniciar').setAttribute('disabled', true);
        limpiarInputUsuario();
    } else{
        // Mostrar nuevamente el parrafo que indica el rango de numeros con los que el usuario puede jugar (Ejem: "Indica un número del 1 al 10")
        // Limpiar la caja de texto donde el usuario ingresa su numero 
        // Obtener un nuevo numero secreto
        // Reinicializar la cantidad de intentos en 1
        
        /* Todo lo anteriormente mencionado se encuentra en esta funcion  */
        condicionesIniciales();
        
        // Habilitar o deshabilitar botones de acuerdo a ciertos criterios
        if(!existenNumerosDisponibles){
            // Deshabilitar de manera definitiva el boton "Nuevo juego" 
            document.getElementById('reiniciar').setAttribute('disabled',true);        
        } else{
            // Deshabilitar momentaneamente el boton "Nuevo juego"
            document.getElementById('reiniciar').setAttribute('disabled',true);
            // Habilitar momentaneamente el boton "Intentar"
            document.getElementById('intentar').removeAttribute('disabled');   
            
        }

    }
    

}


// Funciones auxiliares 
function asignarTextoElementoHTML(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function generarNumeroSecreto() {
    
    console.log(`Lista de numeros sorteados: ${listaNumerosSorteados}`);

    if(listaNumerosSorteados.length == numeroFinal){
        asignarTextoElementoHTML('p', `Ya han salido sorteados todos los numeros disponibles (del 1 al ${numeroFinal})`);
        existenNumerosDisponibles = false;
    } else{
            // Genera un nuevo numero secreto 
            let numeroSecreto = Math.floor(Math.random() * numeroFinal) + 1;

            console.log(`Numero secreto: ${numeroSecreto}`);

            // Si el nuevo numero secreto ya se encuentra en la lista de numero sorteados
            if(listaNumerosSorteados.includes(numeroSecreto)){
                return generarNumeroSecreto();
            } 
            else{
                listaNumerosSorteados.push(numeroSecreto);
                return numeroSecreto;
            }            
    }
}

function limpiarInputUsuario(){
    document.querySelector('#inputUsuario').value = '';
}


function condicionesIniciales(){
    // Mostrar el titulo de nuestro juego de numero secreto (Ejem: "Juego del numero secreto")
    asignarTextoElementoHTML('h1', 'Juego del número secreto');
    
    // Mostrar el parrafo que indica el rango de numeros con los que el usuario puede jugar (Ejem: "Indica un número del 1 al 10")
    asignarTextoElementoHTML('p', `Ingrese un número del 1 al ${numeroFinal}`);
    
    // Limpiar la caja de texto donde el usuario ingresa su numero adivinador (es decir el numero de usuario)
    limpiarInputUsuario();
    
    // Obtener numero secreto
    numeroSecreto = generarNumeroSecreto();

    // Inicializar cantidad de intentos en 1
    cantIntentos = 1;
}







