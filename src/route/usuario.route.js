var express = require('express');
var router = express.Router();

const usuario = require("../controller/usuario.controller.js");

router.post("/cadastrarUsuario", usuario.criarUsuario);

router.put("/alterarSenha", usuario.alterarSenha);

router.get("/encontrarUsuarioPorId/:idUsuario", usuario.encontrarUsuarioPorId);

router.delete('/deletarUsuarioPorId/:idUsuario', usuario.deletarUsuarioPorId);

router.post("/login", usuario.login);

router.post("/cadastrarCliente", usuario.cadastrarCliente);

router.post("/cadastrarVeterinario", usuario.cadastrarVeterinario);

router.get("/isClienteOrMedico/:idusuario", usuario.isClienteOrMedico);

module.exports = router;
