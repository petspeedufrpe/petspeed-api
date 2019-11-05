var express = require('express');
var router = express.Router();

const agendamento = require("../controller/agendamento.controller.js");

router.get("/:idMedico/dias", agendamento.verificarDias);

router.get("/:idMedico/horarios", agendamento.verificarHorarios);

module.exports = router;