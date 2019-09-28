var express = require('express');
var router = express.Router();

const pessoa = require("../controller/pessoa.controller.js");

router.post("/cadastrarPessoa", pessoa.criarPessoa);

router.put("/editarPessoa/:idpessoa", pessoa.editarPessoa);

router.post("/cadastrarEndereco", pessoa.create);

module.exports = router;