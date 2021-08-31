const mongoose = require("mongoose");

function connection() {
  const URL = "mongodb://localhost/medicamentos";

  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", () => {
    console.error("Erro ao se conectar com o banco de dados");
  });

  db.on("open", () => {
    console.log("Conectado com Sucesso ao banco de dados");
  });
}

module.exports = connection;
