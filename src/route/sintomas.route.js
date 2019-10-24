var express = require('express');
var router = express.Router();

const sintomas = require("../controller/sintomas.controller.js");

router.post("/criarSintomas", sintomas.criarSintomas);

module.exports = router;