const express = require("express");
const cors = require("cors");

// IMPORTANDO ROTAS
const usuario = require("../petspeed-api/src/route/usuario.route.js");
const animal = require("../petspeed-api/src/route/animal.route.js");
const pessoa = require("../petspeed-api/src/route/pessoa.route.js");
const cliente = require("../petspeed-api/src/route/cliente.route.js");
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
app.listen(process.env.PORT || 4000);
module.exports = app;
