let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
  let botonPeleadorJugador = document.getElementById("seleccionar-peleador");
  botonPeleadorJugador.addEventListener("click", seleccionarPeleadorJugador);

  let botonBankoku = document.getElementById("boton-bankoku");
  botonBankoku.addEventListener("click", ataqueBankoku);
  let botonBigBang = document.getElementById("boton-bigbang");
  botonBigBang.addEventListener("click", ataqueBigBang);
  let botonZetsumetsu = document.getElementById("boton-zetsumetsu");
  botonZetsumetsu.addEventListener("click", ataqueZetsumetsu);
}
function seleccionarPeleadorJugador() {
  let jugar = 1;
  let inputCoku = document.getElementById("coku");
  let inputVegeto = document.getElementById("vegeto");
  let inputMarioBuu = document.getElementById("mariobuu");
  let spanJugadorParticipante = document.getElementById("participante-judagor");
  if (inputCoku.checked) {
    spanJugadorParticipante.innerHTML = "Coku";
  } else if (inputVegeto.checked) {
    spanJugadorParticipante.innerHTML = "Vegeto";
  } else if (inputMarioBuu.checked) {
    spanJugadorParticipante.innerHTML = "Mario Buu";
  } else {
    alert("Selecciona una Opción");
    jugar = 0;
  }
  if (jugar == 1) {
    seleccionarPeleadorEnemigo();
  }
}

function seleccionarPeleadorEnemigo() {
  let peleadorAleatorio = aleatorio(1, 3);
  let spanPeleadorEnemigo = document.getElementById("participante-enemigo");

  if (peleadorAleatorio === 1) {
    //Coku
    spanPeleadorEnemigo.innerHTML = "Coku";
  } else if (peleadorAleatorio === 2) {
    //Vegeto
    spanPeleadorEnemigo.innerHTML = "Vegeto";
  } else if (peleadorAleatorio === 3) {
    //Mario Buu
    spanPeleadorEnemigo.innerHTML = "Mario Buu";
  }
}

function ataqueBankoku() {
  ataqueJugador = "Bankoku";
  ataqueAleatorioEnemigo();
}
function ataqueBigBang() {
  ataqueJugador = "BigBang";
  ataqueAleatorioEnemigo();
}
function ataqueZetsumetsu() {
  ataqueJugador = "Zetsumetsu";
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio === 1) {
    ataqueEnemigo = "Bankoku";
  } else if (ataqueAleatorio === 2) {
    ataqueEnemigo = "BigBang";
  } else {
    ataqueEnemigo = "Zetsumetsu";
  }
  combate();
}

function combate() {
  //   COMBATE
  // 1-Bankoku
  // 2-BigBang
  // 3-Zetusmetsu
  let spanVidasJugador = document.getElementById("vidas-jugador");
  let spanVidasEnemigo = document.getElementById("vidas-enemigo");

  if (ataqueJugador === ataqueEnemigo) {
    crearMensaje("EMPATE");
  } else if (ataqueJugador === "Bankoku" && ataqueEnemigo === "Zetsumetsu") {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador === "BigBang" && ataqueEnemigo === "Bankoku") {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador === "Zetsumetsu" && ataqueEnemigo === "BigBang") {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    crearMensaje("PERDISTE");
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
  }

  revisarVidas();
}

function revisarVidas() {
  if (vidasEnemigo === 0) {
    crearMensajeFinal("🎉 GANASTE 🎉");
  } else if (vidasJugador === 0) {
    crearMensajeFinal("Lo siento, Perdiste 🎭");
  }
}

function crearMensaje(resultado) {
  let sectionMensajes = document.getElementById("mensajes");
  let parrafo = document.createElement("p");
  parrafo.innerHTML = `Tu peleador número 54 atacó con ${ataqueJugador},El peleador enemigo número 84
  atacó con ${ataqueEnemigo} - ${resultado}`;
  sectionMensajes.appendChild(parrafo);
}

function crearMensajeFinal(resultadoFinal) {
  let sectionMensajes = document.getElementById("mensajes");
  let parrafo = document.createElement("p");
  parrafo.innerHTML = resultadoFinal;
  sectionMensajes.appendChild(parrafo);
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + 1);
}

window.addEventListener("load", iniciarJuego);
