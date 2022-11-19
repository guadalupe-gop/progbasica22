let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
  let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
  sectionSeleccionarAtaque.style.display = "none";

  let botonPeleadorJugador = document.getElementById("seleccionar-peleador");
  botonPeleadorJugador.addEventListener("click", seleccionarPeleadorJugador);

  let sectionReiniciar = document.getElementById("reiniciar");
  sectionReiniciar.style.display = "none";

  let botonBankoku = document.getElementById("boton-bankoku");
  botonBankoku.addEventListener("click", ataqueBankoku);
  let botonBigBang = document.getElementById("boton-bigbang");
  botonBigBang.addEventListener("click", ataqueBigBang);
  let botonZetsumetsu = document.getElementById("boton-zetsumetsu");
  botonZetsumetsu.addEventListener("click", ataqueZetsumetsu);

  let botonReiniciar = document.getElementById("boton-reiniciar");
  botonReiniciar.addEventListener("click", reiniciarJuego);
}
function seleccionarPeleadorJugador() {
  let jugar = 1;
  let sectionSeleccionarPeleador = document.getElementById(
    "seleccionar-jugador"
  );
  sectionSeleccionarPeleador.style.display = "none";

  let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
  sectionSeleccionarAtaque.style.display = "flex";

  let inputCoku = document.getElementById("goku");
  let inputVegeto = document.getElementById("vegeta");
  let inputMarioBuu = document.getElementById("majinbu");
  let spanJugadorParticipante = document.getElementById("participante-judagor");

  if (inputCoku.checked) {
    spanJugadorParticipante.innerHTML = "Goku";
  } else if (inputVegeto.checked) {
    spanJugadorParticipante.innerHTML = "Vegeta";
  } else if (inputMarioBuu.checked) {
    spanJugadorParticipante.innerHTML = "Majin Buu";
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
    spanPeleadorEnemigo.innerHTML = "Goku";
  } else if (peleadorAleatorio === 2) {
    //Vegeto
    spanPeleadorEnemigo.innerHTML = "Vegeta";
  } else if (peleadorAleatorio === 3) {
    //Mario Buu
    spanPeleadorEnemigo.innerHTML = "Majin Buu";
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
  let sectionMensajes = document.getElementById("resultado");
  let ataqueDelJugador = document.getElementById("ataque-del-jugador");
  let ataqueDelEnemigo = document.getElementById("ataque-del-enemigo");

  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  let sectionMensajes = document.getElementById("resultado");
  sectionMensajes.innerHTML = resultadoFinal;
  // sectionMensajes.appendChild(parrafo);

  // Desactiva botones ataque
  let botonBankoku = document.getElementById("boton-bankoku");
  botonBankoku.disabled = true;
  let botonBigBang = document.getElementById("boton-bigbang");
  botonBigBang.disabled = true;
  let botonZetsumetsu = document.getElementById("boton-zetsumetsu");
  botonZetsumetsu.disabled = true;

  let sectionReiniciar = document.getElementById("reiniciar");
  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + 1);
}

window.addEventListener("load", iniciarJuego);
