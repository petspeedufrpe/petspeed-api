var express = require("express");
var router = express.Router();

var verifyJWT = require("../config/user.auth.js");
const pessoa = require("../controller/pessoa.controller.js");

router.post("/cadastrarPessoa", pessoa.criarPessoa);

router.put("/editarPessoa/:idpessoa", pessoa.upload.single('file'), pessoa.editarPessoa);

router.post('/upload', pessoa.upload.single('file'),function(req,res,next){
    console.log(req.file)
    if(!req.file){
        console.log('entrou no erro')
    }
    res.json({fileUrl: req.file.filename});
})

router.post("/cadastrarEndereco", pessoa.dbInsert);

router.get("/:id", pessoa.findByPk);

router.get("/encontrarPorIdUsuario/:idusuario", pessoa.findByIdUsuario);

module.exports = router;
