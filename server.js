const express = require("express");
const cors = require("cors");

// IMPORTANDO ROTAS
const animal = require("../petspeed-api/src/route/animal.route.js");
const pessoa = require("../petspeed-api/src/route/pessoa.route.js");
const cliente = require("../petspeed-api/src/route/cliente.route.js");


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
app.use("/pessoa", pessoa);
app.use("/animal", animal);
app.use("/cliente", cliente);
app.listen(4000);
module.exports = app;
