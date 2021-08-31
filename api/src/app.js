const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const classmongodb = require("./mod/classmongo");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/antinflamatorios", async (req, res) => {
  res.status = 200;
  let registros = await classmongodb.todosregistros();
  res.json(registros);
});

app.set("porta", 3000);

app.listen(
  app.get("porta", () => {
    console.log(`Server rodando na porta ${porta}`);
  })
);
