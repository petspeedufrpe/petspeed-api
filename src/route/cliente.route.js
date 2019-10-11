var express = require('express');
var router = express.Router();

const cliente = require("../controller/cliente.controller.js");


router.post("/cadastrarCliente", cliente.criarCliente);

router.put("/editarCliente/:idcliente", cliente.editarCliente);

router.get("/:idpessoa/animais", cliente.encontrarAnimalPorCliente);


module.exports = router;
