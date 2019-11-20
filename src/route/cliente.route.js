var express = require('express');
var router = express.Router();

const cliente = require("../controller/cliente.controller.js");


router.post("/cadastrar", cliente.create);

router.put("/:idcliente/editar", cliente.update);

router.get("/:idPessoa/animais", cliente.getAnimals);

router.get("/user/:idUser", cliente.findByIdUser);

module.exports = router;
