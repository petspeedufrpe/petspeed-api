var express = require('express');
var router = express.Router();

const triagem = require("../controller/triagem.controller.js");

router.post("/criarTriagem", triagem.criarTriagem);

module.exports = router;