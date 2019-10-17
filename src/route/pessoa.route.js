var express = require("express");
var router = express.Router();
const multer = require("multer");
const multerConfig = require("../config/multer");
var verifyJWT = require("../config/user.auth.js");
const pessoa = require("../controller/pessoa.controller.js");

router.post("/cadastrarPessoa", pessoa.criarPessoa);

router.post("/editarPessoa/:idpessoa", multer(multerConfig).single("file"), pessoa.editarPessoa);

router.post("/cadastrarEndereco", pessoa.dbInsert);

router.get("/:id", pessoa.findByPk);

router.get("/encontrarPorIdUsuario/:idusuario", pessoa.findByIdUsuario);

module.exports = router;
