const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const botonPeleadorJugador = document.getElementById("seleccionar-peleador");
const sectionReiniciar = document.getElementById("reiniciar");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarPeleador = document.getElementById(
  "seleccionar-jugador"
);
const spanJugadorParticipante = document.getElementById("participante-judagor");
const spanPeleadorEnemigo = document.getElementById("participante-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");
const ataqueDelJugador = document.getElementById("ataque-del-jugador");
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById("contenedorAtaques");

let inputCoku;
let inputVegeto;
let inputMarioBuu;
let botonBankoku;
let botonBigBang;
let botonZetsumetsu;
let combatientesZ = [];
let ataqueJugador;
let ataqueEnemigo;
let opcionDeCombatiente;
let opcionDeAtaquesCombatiente;
let peleadorSeleccionado;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Combatiente {
  constructor(nombre, foto, vida) {
    (this.nombre = nombre),
      (this.foto = foto),
      (this.vida = vida),
      (this.ataques = []);
  }
}

let goku = new Combatiente("Goku", "./images/Son_Goku.webp", 5);
let vegeta = new Combatiente("Vegeta", "./images/Vegeta.webp", 5);
let majinbu = new Combatiente("Buu", "./images/majin buu.webp", 5);

goku.ataques.push(
  {
    nombre: "🔥",
    id: "boton-bankoku",
  },
  {
    nombre: "🔥",
    id: "boton-bankoku",
  },
  {
    nombre: "🔥",
    id: "boton-bankoku",
  },
  {
    nombre: "💧",
    id: "boton-bigbang",
  },
  {
    nombre: "🌱",
    id: "boton-zetsumetsu",
  }
);

vegeta.ataques.push(
  {
    nombre: "💧",
    id: "boton-bigbang",
  },
  {
    nombre: "💧",
    id: "boton-bigbang",
  },
  {
    nombre: "💧",
    id: "boton-bigbang",
  },
  {
    nombre: "🔥",
    id: "boton-bankoku",
  },
  {
    nombre: "🌱",
    id: "boton-zetsumetsu",
  }
);

majinbu.ataques.push(
  {
    nombre: "🌱",
    id: "boton-zetsumetsu",
  },
  {
    nombre: "🌱",
    id: "boton-zetsumetsu",
  },
  {
    nombre: "🌱",
    id: "boton-zetsumetsu",
  },
  {
    nombre: "💧",
    id: "boton-bigbang",
  },
  {
    nombre: "🔥",
    id: "boton-bankoku",
  }
);

combatientesZ.push(goku, vegeta, majinbu);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";

  combatientesZ.forEach((combatiente) => {
    opcionDeCombatiente = `
    <input type="radio" name="dragon" id="${combatiente.nombre}" />
        <label class="tarjeta-dragon-ball" for=${combatiente.nombre}>
          <p>${combatiente.nombre}</p>
          <img src="${combatiente.foto}" alt="${combatiente.nombre}" width="70" />
        </label>
    `;

    contenedorTarjetas.innerHTML += opcionDeCombatiente;

    inputCoku = document.getElementById("Goku");
    inputVegeto = document.getElementById("Vegeta");
    inputMarioBuu = document.getElementById("Buu");
  });

  botonPeleadorJugador.addEventListener("click", seleccionarPeleadorJugador);
  sectionReiniciar.style.display = "none";

  botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarPeleadorJugador() {
  let jugar = 1;
  sectionSeleccionarPeleador.style.display = "none";
  sectionSeleccionarAtaque.style.display = "flex";

  if (inputCoku.checked) {
    spanJugadorParticipante.innerHTML = inputCoku.id;
    peleadorSeleccionado = inputCoku.id;
  } else if (inputVegeto.checked) {
    spanJugadorParticipante.innerHTML = inputVegeto.id;
    peleadorSeleccionado = inputVegeto.id;
  } else if (inputMarioBuu.checked) {
    spanJugadorParticipante.innerHTML = inputMarioBuu.id;
    peleadorSeleccionado = inputMarioBuu.id;
  } else {
    alert("Selecciona una Opción");
    jugar = 0;
  }
  if (jugar == 1) {
    extraerAtaques(peleadorSeleccionado);
    seleccionarPeleadorEnemigo();
  }
}

function extraerAtaques(peleadorSeleccionado) {
  let ataques;

  combatientesZ.forEach((combatiente) => {
    if (peleadorSeleccionado === combatiente.nombre) {
      ataques = combatiente.ataques;
    }
  });

  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    opcionDeAtaquesCombatiente = `
    <button id=${ataque.id} class="boton-de-ataque">${ataque.nombre}</button>`;
    contenedorAtaques.innerHTML += opcionDeAtaquesCombatiente;
  });

  botonBankoku = document.getElementById("boton-bankoku");
  botonBigBang = document.getElementById("boton-bigbang");
  botonZetsumetsu = document.getElementById("boton-zetsumetsu");

  botonBankoku.addEventListener("click", ataqueBankoku);
  botonBigBang.addEventListener("click", ataqueBigBang);
  botonZetsumetsu.addEventListener("click", ataqueZetsumetsu);
}

function seleccionarPeleadorEnemigo() {
  let peleadorAleatorio = aleatorio(0, combatientesZ.length - 1);

  spanPeleadorEnemigo.innerHTML = combatientesZ[peleadorAleatorio].nombre;
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
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
