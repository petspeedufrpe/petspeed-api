var express = require('express');
var router = express.Router();

const medico = require("../controller/medico.controller.js");

router.post("/cadastrar", medico.create);

router.patch("/:idmedico/editar", medico.update);

router.get("/all", medico.findAll);

router.post("/findByName", medico.findByName);

module.exports = router;
