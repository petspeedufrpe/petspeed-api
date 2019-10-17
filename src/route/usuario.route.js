var express = require('express');
var router = express.Router();
const multer = require('multer');
const multerConfig = require("../config/multer");
const usuario = require("../controller/usuario.controller.js");

const Usuario = require("../model/Usuario");

router.post("/cadastrarUsuario", usuario.criarUsuario);

router.put("/alterarSenha", usuario.alterarSenha);

router.get("/encontrarUsuarioPorId/:idUsuario", usuario.encontrarUsuarioPorId);

router.delete('/deletarUsuarioPorId/:idUsuario', usuario.deletarUsuarioPorId);

router.post("/login", usuario.login);

router.post("/posts/:idUsuario",multer(multerConfig).single("file"), async (req,res)=>{

    const {originalname:name, size, key} = req.file;
    const {emailUsuario:email} = req.params.idUsuario;
    try{
        const usuario = Usuario.findOne({
            where:{
                email
            }
        });
        if(usuario){
            usuario.update(
                { senha: senhaNova },
                { where: { email } }
            );
            res.json("Foto Salva Com Sucesso");
        }
    } catch(err){}
    return res.json({message: "Teste"});
})

router.post("/cadastrarCliente", usuario.cadastrarCliente);

router.post("/cadastrarVeterinario", usuario.cadastrarVeterinario);

router.get("/isClienteOrMedico/:idusuario", usuario.isClienteOrMedico);

module.exports = router;
