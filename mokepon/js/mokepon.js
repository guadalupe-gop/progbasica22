const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const botonPeleadorJugador = document.getElementById("seleccionar-peleador");
const sectionReiniciar = document.getElementById("reiniciar");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarPeleador = document.getElementById(
  "seleccionar-jugador"
);
const spanJugadorParticipante = document.getElementById("participante-judagor");
const spanPeleadorEnemigo = document.getElementById("participante-enemigo");

const spanVictoriasJugador = document.getElementById("vidas-jugador");
const spanVictoriasEnemigo = document.getElementById("vidas-enemigo");

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
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeCombatiente;
let opcionDeAtaquesCombatiente;
let peleadorSeleccionado;
let ataquesPeleadorEnemigo;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;

class Combatiente {
  constructor(nombre, foto, vida, tipo) {
    (this.nombre = nombre),
      (this.foto = foto),
      (this.vida = vida),
      (this.tipo = tipo),
      (this.ataques = []);
  }
}

let goku = new Combatiente("Goku", "./images/Son_Goku.webp", 5, "Bankoku");
let vegeta = new Combatiente("Vegeta", "./images/Vegeta.webp", 5, "BigBang");
let majinbu = new Combatiente(
  "Buu",
  "./images/majin buu.webp",
  5,
  "Zetsumetsu"
);
// let cell = new Combatiente("Cell", "./images/cell-perfecto.webp", 5, "Bankoku");

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
    <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`;
    contenedorAtaques.innerHTML += opcionDeAtaquesCombatiente;
  });

  botonBankoku = document.getElementById("boton-bankoku");
  botonBigBang = document.getElementById("boton-bigbang");
  botonZetsumetsu = document.getElementById("boton-zetsumetsu");
  botones = document.querySelectorAll(".BAtaque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("Bankoku");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        // Desactiva botones ataque
        boton.disabled = true;
      } else if (e.target.textContent === "💧") {
        ataqueJugador.push("BigBang");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else {
        ataqueJugador.push("Zetsumetsu");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      }
      ataqueAleatorioEnemigo();
    });
  });
}

function seleccionarPeleadorEnemigo() {
  let peleadorAleatorio = aleatorio(0, combatientesZ.length - 1);

  spanPeleadorEnemigo.innerHTML = combatientesZ[peleadorAleatorio].nombre;
  ataquesPeleadorEnemigo = combatientesZ[peleadorAleatorio].ataques;
  secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesPeleadorEnemigo.length - 1);

  let ataque = ataquesPeleadorEnemigo[ataqueAleatorio].nombre;
  // ataqueEnemigo.push(ataquesPeleadorEnemigo[ataqueAleatorio].nombre);

  ataquesPeleadorEnemigo.splice(ataqueAleatorio, 1);

  if (ataque === "🔥") {
    ataqueEnemigo.push("Bankoku");
  } else if (ataque === "💧") {
    ataqueEnemigo.push("BigBang");
  } else {
    ataqueEnemigo.push("Zetsumetsu");
  }
  // if (ataqueAleatorio === 0 || ataqueAleatorio === 1) {
  //   ataqueEnemigo.push("Bankoku");
  // } else if (ataqueAleatorio === 4 || ataqueAleatorio === 5) {
  //   ataqueEnemigo.push("BigBang");
  // } else {
  //   ataqueEnemigo.push("Zetsumetsu");
  // }
  console.log(ataqueEnemigo);
  // console.log(ataquesPeleadorEnemigo);
  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
  //   COMBATE
  // 1-Bankoku
  // 2-BigBang
  // 3-Zetusmetsu

  for (let i = 0; i < ataqueJugador.length; i++) {
    if (ataqueJugador[i] === ataqueEnemigo[i]) {
      indexAmbosOponentes(i, i);
      crearMensaje("EMPATE");
    } else if (
      ataqueJugador[i] === "Bankoku" &&
      ataqueEnemigo[i] === "Zetsumetsu"
    ) {
      indexAmbosOponentes(i, i);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVictoriasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[i] === "BigBang" &&
      ataqueEnemigo[i] === "Bankoku"
    ) {
      indexAmbosOponentes(i, i);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVictoriasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[i] === "Zetsumetsu" &&
      ataqueEnemigo === "BigBang"
    ) {
      indexAmbosOponentes(i, i);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVictoriasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(i, i);
      crearMensaje("PERDISTE");
      victoriasEnemigo++;
      spanVictoriasEnemigo.innerHTML = victoriasEnemigo;
    }
  }

  revisarVictorias();
}

function revisarVictorias() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("Fue un empate");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("FELICITACIONES! Ganaste👏");
  } else {
    crearMensajeFinal("Lo siento, Perdiste");
  }
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

  ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
