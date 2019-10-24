var express = require('express');
var router = express.Router();

const ordemServico = require("../controller/ordemServico.controller.js");

router.post("/criarOrdemServico", ordemServico.criarOrdemServico);

router.get("/listarOrdemServico", ordemServico.encontrarOrdemServico);

router.get("/findAllOrdemServico", ordemServico.findAllOS);

router.get("/getOsByMedico/:idmedico", ordemServico.getOsByMedico);

module.exports = router;