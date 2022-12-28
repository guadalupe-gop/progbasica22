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

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

let jugadorId = null;
let inputCoku;
let inputVegeto;
let inputMarioBuu;
let botonBankoku;
let botonBigBang;
let botonZetsumetsu;
let combatientesZ = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let peleadoresEnemigos = [];
let opcionDeCombatiente;
let opcionDeAtaquesCombatiente;
let peleadorSeleccionado;
let peleadorSeleccionadoObjt;
let ataquesPeleadorEnemigo;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./images/dragonBallMap.jpg";

let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;

const anchoMaximoDelMapa = 375;

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}
alturaQueBuscamos = (anchoDelMapa * 600) / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Combatiente {
  constructor(nombre, foto, vida, tipo, fotoMapa, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.tipo = tipo;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 80;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarPeleadores() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let goku = new Combatiente(
  "Goku",
  "./images/Son_Goku.webp",
  5,
  "Bankoku",
  "./images/Son_Goku.webp"
);
let vegeta = new Combatiente(
  "Vegeta",
  "./images/Vegeta.webp",
  5,
  "BigBang",
  "./images/Vegeta.webp"
);
let majinbu = new Combatiente(
  "Buu",
  "./images/majin buu.webp",
  5,
  "Zetsumetsu",
  "./images/majin buu.webp"
);

// Enemigos

// let cell = new Combatiente("Cell", "./images/cell-perfecto.webp", 5, "Bankoku");

const GOKU_ATAQUES = [
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
  },
];

goku.ataques.push(...GOKU_ATAQUES);

const VEGETA_ATAQUES = [
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
  },
];

vegeta.ataques.push(...VEGETA_ATAQUES);

const MAJINBU_ATAQUES = [
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
  },
];

majinbu.ataques.push(...MAJINBU_ATAQUES);

combatientesZ.push(goku, vegeta, majinbu);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionVerMapa.style.display = "none";

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

  unirseAlJuego();
}

function unirseAlJuego() {
  fetch("http://localhost:8080/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
}

function seleccionarPeleadorJugador() {
  let jugar = 1;
  sectionSeleccionarPeleador.style.display = "none";

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
    seleccionarPeleador(peleadorSeleccionado);
    extraerAtaques(peleadorSeleccionado);
    sectionVerMapa.style.display = "flex";
    iniciarMapa();
  }
}

function seleccionarPeleador(peleadorSeleccionado) {
  fetch(`http://localhost:8080/peleador/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      peleador: peleadorSeleccionado,
    }),
  });
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

function seleccionarPeleadorEnemigo(enemigo) {
  // let peleadorAleatorio = aleatorio(0, combatientesZ.length - 1);

  spanPeleadorEnemigo.innerHTML = enemigo.nombre;
  ataquesPeleadorEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
  console.log("ataques enemigo" + ataquesPeleadorEnemigo);
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

function pintarCanvas() {
  peleadorSeleccionadoObjt.x =
    peleadorSeleccionadoObjt.x + peleadorSeleccionadoObjt.velocidadX;
  peleadorSeleccionadoObjt.y =
    peleadorSeleccionadoObjt.y + peleadorSeleccionadoObjt.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  peleadorSeleccionadoObjt.pintarPeleadores();

  enviarPosicion(peleadorSeleccionadoObjt.x, peleadorSeleccionadoObjt.y);

  peleadoresEnemigos.forEach((peleador) => {
    if (peleador != undefined) {
      peleador.pintarPeleadores();
    }
  });
  // gokuEnemigo.pintarPeleadores();
  // vegetaEnemigo.pintarPeleadores();
  // majinbuEnemigo.pintarPeleadores();

  if (
    peleadorSeleccionadoObjt.velocidadX != 0 ||
    peleadorSeleccionadoObjt.velocidadY != 0
  ) {
    revisarColision(gokuEnemigo);
    revisarColision(vegetaEnemigo);
    revisarColision(majinbuEnemigo);
  }
}

function enviarPosicion(x, y) {
  fetch(`http://localhost:8080/peleador/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then((res) => {
    if (res.ok) {
      res.json().then(({ enemigos }) => {
        console.log(enemigos);
        peleadoresEnemigos = enemigos.map((enemigo) => {
          let peleadorEnemigo = null;

          if (enemigo.peleador != undefined) {
            const peleadorNombre = enemigo.peleador.nombre || "";

            if (peleadorNombre === "Goku") {
              peleadorEnemigo = new Combatiente(
                "Goku",
                "./images/Son_Goku.webp",
                5,
                "Bankoku",
                "./images/Son_Goku.webp"
              );
            } else if (peleadorNombre === "Vegeta") {
              peleadorEnemigo = new Combatiente(
                "Vegeta",
                "./images/Vegeta.webp",
                5,
                "BigBang",
                "./images/Vegeta.webp"
              );
            } else if (peleadorNombre === "Buu") {
              peleadorEnemigo = new Combatiente(
                "Buu",
                "./images/majin buu.webp",
                5,
                "Zetsumetsu",
                "./images/majin buu.webp"
              );
            }

            peleadorEnemigo.x = enemigo.x;
            peleadorEnemigo.y = enemigo.y;
          }
          return peleadorEnemigo;
        });
      });
    }
  });
}

function moveRight() {
  peleadorSeleccionadoObjt.velocidadX = 5;
}

function moveLeft() {
  peleadorSeleccionadoObjt.velocidadX = -5;
}

function moveUp() {
  peleadorSeleccionadoObjt.velocidadY = -5;
}

function moveDown() {
  peleadorSeleccionadoObjt.velocidadY = 5;
}

function stopMove() {
  peleadorSeleccionadoObjt.velocidadX = 0;
  peleadorSeleccionadoObjt.velocidadY = 0;
}

function sePresionaUnaTecla(e) {
  switch (e.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    default:
      console.log("Not move");
      break;
  }
}

function iniciarMapa() {
  peleadorSeleccionadoObjt = obtenerObjetoPeleador(peleadorSeleccionado);
  intervalo = setInterval(pintarCanvas, 50);

  window.addEventListener("keydown", sePresionaUnaTecla);

  window.addEventListener("keyup", stopMove);
}

function obtenerObjetoPeleador() {
  for (let i = 0; i < combatientesZ.length; i++) {
    if (peleadorSeleccionado === combatientesZ[i].nombre) {
      return combatientesZ[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaPeleador = peleadorSeleccionadoObjt.y;
  const abajoPeleador =
    peleadorSeleccionadoObjt.y + peleadorSeleccionadoObjt.alto;
  const derechaPeleador =
    peleadorSeleccionadoObjt.x + peleadorSeleccionadoObjt.ancho;
  const izquierdaPeleador = peleadorSeleccionadoObjt.x;
  //
  if (
    abajoPeleador < arribaEnemigo ||
    arribaPeleador > abajoEnemigo ||
    derechaPeleador < izquierdaEnemigo ||
    izquierdaPeleador > derechaEnemigo
  ) {
    return;
  }

  stopMove();
  clearInterval(intervalo);
  // console.log("Se detectó una colision");
  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none";
  seleccionarPeleadorEnemigo(enemigo);
  // alert(`Hay una colision ${enemigo.nombre}`);
}
window.addEventListener("load", iniciarJuego);
