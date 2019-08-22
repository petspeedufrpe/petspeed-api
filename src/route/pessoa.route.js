var express = require('express');
var router = express.Router();

const pessoa = require("../controller/pessoa.controller.js");

router.post("/cadastrarPessoa/:idUsuario", pessoa.criarPessoa);

router.put("/editarPessoa", pessoa.editarPessoa);

module.exports = router;