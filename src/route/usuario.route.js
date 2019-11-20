var express = require('express');
var router = express.Router();
const multer = require('multer');
const multerConfig = require("../config/multer");
const usuario = require("../controller/usuario.controller.js");

const Usuario = require("../model/Usuario");

router.post("/cadastrar", usuario.create);

router.patch("/alterarSenha", usuario.updateSenha);

router.get("/:idUsuario", usuario.findById);

router.delete('/delete/:idUsuario', usuario.delete);

router.post("/login", usuario.login);

router.post("/posts/:idUsuario", multer(multerConfig).single("file"), async (req, res) => {
    const { originalname: name, size, key } = req.file;
    const { emailUsuario: email } = req.params.idUsuario;
    try {
        const usuario = Usuario.findOne({
            where: {
                email
            }
        });
        if (usuario) {
            usuario.update(
                { foto: key },
                { where: { email } }
            );
            res.json("Foto Salva Com Sucesso");
        }
    } catch (err) { }
    return res.json({ message: "Teste" });
})

router.post("/cadastrarCliente", usuario.createCliente);

router.post("/cadastrarVeterinario", usuario.createMedico);

router.get("/isClienteOrMedico/:idusuario", usuario.isClienteOrMedico);

module.exports = router;
