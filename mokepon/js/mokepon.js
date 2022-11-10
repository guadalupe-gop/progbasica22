let ataqueJugador;

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
  let spanPeleadorEnemigo = document.getElementById("participante-enemigo");
  let ataqueAleatorio = aleatorio(1, 3);
  if (ataqueAleatorio === 1) {
    //Coku
    spanPeleadorEnemigo.innerHTML = "Coku";
  } else if (ataqueAleatorio === 2) {
    //Vegeto
    spanPeleadorEnemigo.innerHTML = "Vegeto";
  } else if (ataqueAleatorio === 3) {
    //Mario Buu
    spanPeleadorEnemigo.innerHTML = "Mario Buu";
  }
}

function ataqueBankoku() {
  ataqueJugador = "Bankoku";
  console.log(ataqueJugador);
}
function ataqueBigBang() {
  ataqueJugador = "BigBang";
  console.log(ataqueJugador);
}
function ataqueZetsumetsu() {
  ataqueJugador = "Zetsumetsu";
  console.log(ataqueJugador);
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + 1);
}

window.addEventListener("load", iniciarJuego);
