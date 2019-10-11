var express = require('express');
var router = express.Router();

const medico = require("../controller/medico.controller.js");

router.post("/criarMedico", medico.criarMedico);

router.put("/editarMedico/:idmedico", medico.editarMedico);

router.get("/all", medico.findAllMedicos);

module.exports = router;

