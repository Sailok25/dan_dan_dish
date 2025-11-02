// Variables para guardar la cantidad de balas que tiene cada jugador.
let balasJugador = 0;
let balasCPU = 0;

// Variables constantes para despues poder modificar el texto del html desde el js.
const textoBalasJugador = document.getElementById('balas-jugador');
const textoBalasCPU = document.getElementById('balas-cpu');
const resultadoRonda = document.getElementById('resultado-ronda');


// Función para manejar los clics en los botones pasando por parametro la opción elegida a la función "jugar".
document.getElementById('recargar').addEventListener('click', () => jugar('recargar'));
document.getElementById('disparar').addEventListener('click', () => jugar('disparar'));
document.getElementById('escudo').addEventListener('click', () => jugar('escudo'));


// Esta función se ejecuta cada vez que el jugador elige una acción.
function jugar(eleccionJugador) {

  // La CPU elige aleatoriamente entre recargar, disparar o escudo.
  const eleccionCPU = obtenerEleccionCPU();

  // Guardamos el resultado del turno (texto que se mostrará al final)
  let mensajeResultado = '';

  // Si el jugador elige recargar, gana una bala.
  if (eleccionJugador === 'recargar') {
    balasJugador++;
  }

  // Si el jugador elige disparar:
  if (eleccionJugador === 'disparar') {
    // Comprobamos si tiene balas para disparar.
    if (balasJugador <= 0) {
      resultadoRonda.textContent = 'No tienes balas para disparar.';
      return;
    }

    // Si tiene balas, dispara y gasta una.
    balasJugador--;
  }

  // La CPU también recarga o dispara según su elección.
  if (eleccionCPU === 'recargar') {
    balasCPU++;
  }
  if (eleccionCPU === 'disparar') {
    // Si tiene balas, dispara y gasta una.
    if (balasCPU > 0) {
      balasCPU--;
    } else {
      // Si no tiene balas, cambia su acción a recargar (hay que cambiarlo para que pueda decidir protegerse tmb).
      eleccionCPU = 'recargar';
      balasCPU++;
    }
  }

// mensajes para cada posible enfrentamiento
  if (eleccionJugador === 'disparar' && eleccionCPU === 'recargar') {
    mensajeResultado = 'Has disparado mientras recargaba. ¡Has ganado esta ronda!';
  } else if (eleccionJugador === 'recargar' && eleccionCPU === 'disparar') {
    mensajeResultado = 'Te ha disparado mientras recargabas. Has perdido.';
  } else if (eleccionJugador === 'disparar' && eleccionCPU === 'disparar') {
    mensajeResultado = 'Ambos disparasteis al mismo tiempo. Suicidio i empate.';
  } else if (eleccionJugador === 'escudo' && eleccionCPU === 'disparar') {
    // Si bloqueas un disparo, pierdes una bala (si tienes alguna)
    if (balasJugador > 0) balasJugador--;
    mensajeResultado = 'Has bloqueado su disparo.';
  } else if (eleccionJugador === 'disparar' && eleccionCPU === 'escudo') {
    if (balasCPU > 0) balasCPU--;
    mensajeResultado = 'La CPU ha bloqueado tu disparo.';
  } else if (eleccionJugador === 'recargar' && eleccionCPU === 'recargar') {
    mensajeResultado = 'Ambos habéis recargado.';
  } else if (eleccionJugador === 'escudo' && eleccionCPU === 'escudo') {
    mensajeResultado = 'Ambos os habéis protegido.';
  }

  // Se actualiza el número de balas que se muestra en pantalla.
  textoBalasJugador.textContent = balasJugador;
  textoBalasCPU.textContent = balasCPU;

  // Se muestra el mensaje con el resultado de la ronda.
  resultadoRonda.innerHTML = `
    <p>Tú elegiste: <b>${eleccionJugador.toUpperCase()}</b></p>
    <p>CPU eligió: <b>${eleccionCPU.toUpperCase()}</b></p>
    <h3>${mensajeResultado}</h3>
  `;
}

// Esta función hace elegir a la CPU una acción aleatoria: recargar, disparar o escudo.
function obtenerEleccionCPU() {
  const opciones = ['recargar', 'disparar', 'escudo'];
  const i = Math.floor(Math.random() * 3); // esto devuelve un numero del 0 al 2 (3numeros para 3 opciónes a escoger)
  return opciones[i];
}