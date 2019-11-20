var express = require('express');
var router = express.Router();

const ordemServico = require("../controller/ordemServico.controller.js");

router.post("/cadastrar", ordemServico.create);

router.get("/all", ordemServico.findAll);

router.get("/medico/:idMedico", ordemServico.findByIdMedico);

router.get("/cliente/:idCliente", ordemServico.findByIdCliente);

router.get("/animal/:idAnimal", ordemServico.findByIdAnimal);

router.get("/:idOrdemServico", ordemServico.findById);

module.exports = router;