var express = require('express');
var router = express.Router();

var verifyJWT = require("../config/user.auth.js");
const pessoa = require("../controller/pessoa.controller.js");

router.post("/cadastrarPessoa", pessoa.criarPessoa);

router.put("/editarPessoa/:idpessoa", pessoa.editarPessoa);

router.post("/cadastrarEndereco", verifyJWT, pessoa.create);

module.exports = router;