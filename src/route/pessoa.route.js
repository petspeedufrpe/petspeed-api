var express = require("express");
var router = express.Router();
const multer = require("multer");
const multerConfig = require("../config/multer");
var verifyJWT = require("../config/user.auth.js");
const pessoa = require("../controller/pessoa.controller.js");

router.post("/cadastrarPessoa", pessoa.criarPessoa);

router.put("/editarPessoa/:idpessoa", pessoa.editarPessoa);

router.post("/upload",multer(multerConfig).single("file"), (req,res)=> {
    console.log(req.file)
    return res.json({hello:'Teste'});
});
router.post("/cadastrarEndereco", pessoa.dbInsert);

router.get("/:id", pessoa.findByPk);

router.get("/encontrarPorIdUsuario/:idusuario", pessoa.findByIdUsuario);

module.exports = router;
