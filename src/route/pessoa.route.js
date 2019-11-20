var express = require("express");
var router = express.Router();
const multer = require("multer");
const multerConfig = require("../config/multer");
var verifyJWT = require("../config/user.auth.js");
const pessoa = require("../controller/pessoa.controller.js");

router.post("/cadastrar", pessoa.create);

router.patch("/:idpessoa/editar", multer(multerConfig).single("file"), pessoa.update);

router.post("/cadastrarEndereco", pessoa.createAddress);

router.get("/:id", pessoa.findById);

router.get("/usuario/:idusuario", pessoa.findByIdUsuario);

module.exports = router;
