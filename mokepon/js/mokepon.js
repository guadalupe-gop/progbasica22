function iniciarJuego() {
  let botonPeleadorJugador = document.getElementById("seleccionar-peleador");
  botonPeleadorJugador.addEventListener("click", seleccionarPeleadorJugador);
}
function seleccionarPeleadorJugador() {
  let inputCoku = document.getElementById("coku");
  let inputVegeto = document.getElementById("vegeto");
  let inputMarioBuu = document.getElementById("mariobuu");
  let jugadorParticipante = document.getElementById("participante-judagor");
  if (inputCoku.checked) {
    alert("Seleccionaste a Coku");
    jugadorParticipante.innerHTML = "Coku";
  } else if (inputVegeto.checked) {
    alert("Seleccionaste a Vegeto");
    jugadorParticipante.innerHTML = "Vegeto";
  } else if (inputMarioBuu.checked) {
    alert("Seleccionaste a Mario Buu");
    jugadorParticipante.innerHTML = "Mario Buu";
  } else {
    alert("Selecciona una Opción");
  }
}

window.addEventListener("load", iniciarJuego);
