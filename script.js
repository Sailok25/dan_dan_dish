// Variables globales
let balasJugador = 0;
let balasCPU = 0;
let tiempoRestante = 5; // 5 segundos para elegir
let temporizador;
let juegoActivo = false;

// Elementos del DOM
const menuPrincipal = document.getElementById('menu-principal');
const comoJugar = document.getElementById('como-jugar');
const pantallaJuego = document.getElementById('pantalla-juego');
const textoBalasJugador = document.getElementById('balas-jugador');
const textoBalasCPU = document.getElementById('balas-cpu');
const resultadoRonda = document.getElementById('avisos-jugador');
const barraTiempo = document.getElementById('barra-tiempo');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Botones del menú
document.getElementById('btn-nueva-partida').addEventListener('click', () => {
  menuPrincipal.style.display = 'none';
  pantallaJuego.style.display = 'block';
  iniciarJuego();
});

document.getElementById('btn-como-jugar').addEventListener('click', () => {
  menuPrincipal.style.display = 'none';
  comoJugar.style.display = 'block';
});

document.getElementById('btn-volver-menu').addEventListener('click', () => {
  comoJugar.style.display = 'none';
  menuPrincipal.style.display = 'block';
});

// Botones del juego
document.getElementById('recargar').addEventListener('click', () => jugar('recargar'));
document.getElementById('disparar').addEventListener('click', () => jugar('disparar'));
document.getElementById('escudo').addEventListener('click', () => jugar('escudo'));
btnReiniciar.addEventListener('click', reiniciarJuego);

// Iniciar el juego
function iniciarJuego() {
  balasJugador = 0;
  balasCPU = 0;
  textoBalasJugador.textContent = balasJugador;
  textoBalasCPU.textContent = balasCPU;
  resultadoRonda.innerHTML = '';
  btnReiniciar.style.display = 'none';
  juegoActivo = true;
  iniciarTemporizador();
}

// Reiniciar el juego
function reiniciarJuego() {
  iniciarJuego();
}

// Temporizador
function iniciarTemporizador() {
  tiempoRestante = 5;
  barraTiempo.style.width = '100%';
  temporizador = setInterval(() => {
    tiempoRestante--;
    barraTiempo.style.width = `${(tiempoRestante / 5) * 100}%`;
    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      jugar('recargar'); // Si no elige, recarga por defecto
    }
  }, 1000);
}

// Lógica del juego
function jugar(eleccionJugador) {
  if (!juegoActivo) return;
  clearInterval(temporizador);
  const eleccionCPU = obtenerEleccionCPU();
  let mensajeResultado = '';

  // Lógica del jugador
  if (eleccionJugador === 'recargar') {
    balasJugador++;
  } else if (eleccionJugador === 'disparar') {
    if (balasJugador <= 0) {
      resultadoRonda.innerHTML = '<p>No tienes balas para disparar.</p>';
      iniciarTemporizador();
      return;
    }
    balasJugador--;
  }

  // Lógica de la CPU
  if (eleccionCPU === 'recargar') {
    balasCPU++;
  } else if (eleccionCPU === 'disparar') {
    if (balasCPU > 0) {
      balasCPU--;
    } else {
      const opcionesSinBalas = ['recargar', 'escudo'];
      const i = Math.floor(Math.random() * 2);
      const nuevaEleccionCPU = opcionesSinBalas[i];
      if (nuevaEleccionCPU === 'recargar') balasCPU++;
    }
  }

  // Resultados
  if (eleccionJugador === 'disparar' && eleccionCPU === 'recargar') {
    mensajeResultado = '¡Has disparado mientras la CPU recargaba! Has ganado esta ronda.';
    balasCPU = 0;
    juegoActivo = false;
  } else if (eleccionJugador === 'recargar' && eleccionCPU === 'disparar') {
    mensajeResultado = 'La CPU te ha disparado mientras recargabas. ¡Has perdido!';
    balasJugador = 0;
    juegoActivo = false;
  } else if (eleccionJugador === 'disparar' && eleccionCPU === 'disparar') {
    mensajeResultado = '¡Ambos disparasteis al mismo tiempo! Empate.';
    balasJugador = 0;
    balasCPU = 0;
    juegoActivo = false;
  } else if (eleccionJugador === 'escudo' && eleccionCPU === 'disparar') {
    if (balasJugador > 0) balasJugador--;
    mensajeResultado = 'Has bloqueado el disparo de la CPU.';
  } else if (eleccionJugador === 'disparar' && eleccionCPU === 'escudo') {
    if (balasCPU > 0) balasCPU--;
    mensajeResultado = 'La CPU ha bloqueado tu disparo.';
  } else if (eleccionJugador === 'recargar' && eleccionCPU === 'recargar') {
    mensajeResultado = 'Ambos habéis recargado.';
  } else if (eleccionJugador === 'escudo' && eleccionCPU === 'escudo') {
    mensajeResultado = 'Ambos os habéis protegido.';
  } else {
    mensajeResultado = 'Nada especial ha pasado.';
  }

  // Actualizar balas
  textoBalasJugador.textContent = balasJugador;
  textoBalasCPU.textContent = balasCPU;

  // Mostrar resultado
  resultadoRonda.innerHTML = `
    <p>Tú elegiste: <b>${eleccionJugador.toUpperCase()}</b></p>
    <p>CPU eligió: <b>${eleccionCPU.toUpperCase()}</b></p>
    <h3>${mensajeResultado}</h3>
  `;

  // Mostrar botón de reinicio si el juego terminó
  if (!juegoActivo) {
    btnReiniciar.style.display = 'block';
  } else {
    iniciarTemporizador();
  }
}

// Elección aleatoria de la CPU
function obtenerEleccionCPU() {
  const opciones = ['recargar', 'disparar', 'escudo'];
  const i = Math.floor(Math.random() * 3);
  return opciones[i];
}
