var express = require('express');
var router = express.Router();

const usuario = require("../controller/usuario.controller.js");

router.post("/cadastrarUsuario", usuario.criarUsuario);

router.get("/encontrarUsuarioPorId/:idUsuario", usuario.encontrarUsuarioPorId);

router.delete('/deletarUsuarioPorId/:idUsuario', usuario.deletarUsuarioPorId);

module.exports = router;