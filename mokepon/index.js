const express = require("express");
const cors = require("cors");

const app = express();

const port = 8080;

app.use(cors());
app.use(express.json());

const jugadores = [];

class Jugador {
  constructor(id) {
    this.id = id;
  }

  asignarPeleador(peleador) {
    this.peleador = peleador;
  }

  actualizarPosicion(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Peleador {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`;
  const jugador = new Jugador(id);
  jugadores.push(jugador);
  res.send(id);
});

app.post("/peleador/:jugadorId", (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const nombre = req.body.peleador || "";
  const peleador = new Peleador(nombre);
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarPeleador(peleador);
  }
  console.log(jugadores);
  console.log(jugadorId);
  res.end();
});

app.post("/peleador/:jugadorId/posicion", (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const x = req.body.x || 0;
  const y = req.body.y || 0;
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y);
  }

  const enemigos = jugadores.filter((jugador) => jugadorId != jugador.id);

  res.send({
    enemigos,
  });
});

app.listen(8080, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
