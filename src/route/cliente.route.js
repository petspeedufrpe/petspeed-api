var express = require('express');
var router = express.Router();

const cliente = require("../controller/cliente.controller.js");

router.post("/cadastrarCliente", cliente.criarCliente);

router.put("/editarCliente", cliente.editarCliente);

router.get("/encontrarAnimalPorCliente", cliente.encontrarAnimalPorCliente);

module.exports = router;
