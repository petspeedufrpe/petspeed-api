var express = require("express");
var router = express.Router();

var verifyJWT = require("../config/user.auth.js");
const pessoa = require("../controller/pessoa.controller.js");

router.post("/cadastrarPessoa", pessoa.criarPessoa);

router.put("/editarPessoa/:idpessoa", pessoa.editarPessoa);

router.post("/cadastrarEndereco", pessoa.dbInsert);

router.get("/:id", pessoa.findByPk);

module.exports = router;
