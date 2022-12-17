const express = require("express");

const app = express();

const port = 8080;

app.get("/", (req, res) => {
  res.send("Welcome, welcome nodeJS");
});

app.listen(8080, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
