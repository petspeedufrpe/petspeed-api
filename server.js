const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv-safe");

if (!process.env.NODE_ENV) {
	dotenv.config();
}

const PORT = process.env.PORT || 3306;
// IMPORTANDO ROTAS
const usuario = require("./src/route/usuario.route.js");
const animal = require("./src/route/animal.route.js");
const pessoa = require("./src/route/pessoa.route.js");
const cliente = require("./src/route/cliente.route.js");
const medico = require("./src/route/medico.route.js");
//

var app = express();
var bodyParser = require("body-parser");
const db = require("./src/config/db.config.js");

db.sequelize.sync().then(() => {});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
	cors({
		origin: "*"
	})
);
app.use("/usuario", usuario);
app.use("/pessoa", pessoa);
app.use("/animal", animal);
app.use("/cliente", cliente);
app.use("/medico", medico);
app.listen(PORT);
module.exports = app;
