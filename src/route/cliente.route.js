var express = require('express');
var router = express.Router();

const cliente = require("../controller/cliente.controller.js");


router.post("/cadastrarCliente", cliente.criarCliente);

router.put("/editarCliente/:idcliente", cliente.editarCliente);

router.get("/cliente/:idPessoa", cliente.encontrarAnimalPorCliente);

router.get("/getClienteByIdUser/:idUser", cliente.getByIdUser);

module.exports = router;
