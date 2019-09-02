var express = require('express');
var router = express.Router();

const animal = require("../controller/animal.controller.js");

router.post("/cadastrarAnimal", animal.criarAnimal);

router.put("/editarAnimal/:idanimal", animal.editarAnimal);

module.exports = router;