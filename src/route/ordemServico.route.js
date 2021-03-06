var express = require('express');
var router = express.Router();

const ordemServico = require("../controller/ordemServico.controller.js");

router.post("/criarOrdemServico", ordemServico.criarordemServico);

router.get("/listarOrdemServico/:idOrdemServico", ordemServico.encontrarOrdemServico);

router.get("/findAllOrdemServico", ordemServico.findAllOS);

router.get("/getOsByMedico/:idMedico", ordemServico.getOsByMedico);

router.get("/getOsByCliente/:idCliente", ordemServico.getOsByCliente);

router.get("/getOsByAnimal/:idAnimal", ordemServico.getOsByAnimal);

router.post("/solicitarAgendamento", ordemServico.solicitarAgendamento);

module.exports = router;