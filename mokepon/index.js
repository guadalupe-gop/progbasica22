const express = require("express");
const cors = require("cors");

const app = express();

const port = 8080;

app.use(cors());

const jugadores = [];

class Jugador {
  constructor(id) {
    this.id = id;
  }
}

app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`;
  const jugador = new Jugador(id);
  jugadores.push(jugador);
  res.send(id);
});

app.listen(8080, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
