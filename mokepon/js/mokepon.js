const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const botonPeleadorJugador = document.getElementById("seleccionar-peleador");
const sectionReiniciar = document.getElementById("reiniciar");
const botonBankoku = document.getElementById("boton-bankoku");
const botonBigBang = document.getElementById("boton-bigbang");
const botonZetsumetsu = document.getElementById("boton-zetsumetsu");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarPeleador = document.getElementById(
  "seleccionar-jugador"
);
const inputCoku = document.getElementById("goku");
const inputVegeto = document.getElementById("vegeta");
const inputMarioBuu = document.getElementById("majinbu");
const spanJugadorParticipante = document.getElementById("participante-judagor");
const spanPeleadorEnemigo = document.getElementById("participante-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");
const ataqueDelJugador = document.getElementById("ataque-del-jugador");
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo");

let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Combatiente {
  constructor(nombre, foto, vida) {
    (this.nombre = nombre), (this.foto = foto), (this.vida = vida);
  }
}

let goku = new Combatiente("Goku", "./images/Son_Goku.webp", 5);
let vegeta = new Combatiente("Vegeta", "./images/Vegeta.webp", 5);
let majinbu = new Combatiente("MajinBuu", "./images/majin buu.webp", 5);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";
  botonPeleadorJugador.addEventListener("click", seleccionarPeleadorJugador);
  sectionReiniciar.style.display = "none";

  botonBankoku.addEventListener("click", ataqueBankoku);
  botonBigBang.addEventListener("click", ataqueBigBang);
  botonZetsumetsu.addEventListener("click", ataqueZetsumetsu);
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarPeleadorJugador() {
  let jugar = 1;
  sectionSeleccionarPeleador.style.display = "none";
  sectionSeleccionarAtaque.style.display = "flex";

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
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  // Desactiva botones ataque
  botonBankoku.disabled = true;
  botonBigBang.disabled = true;
  botonZetsumetsu.disabled = true;
  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + 1);
}

window.addEventListener("load", iniciarJuego);
