var express = require('express');
var router = express.Router();

const animal = require("../controller/animal.controller.js");

router.post("/cadastrarAnimal", animal.criarAnimal);

router.put("/editarAnimal/:idanimal", animal.editarAnimal);

router.get("/cliente/:idCliente", animal.getAnimalByIdCliente);

router.get("/:id", animal.getAnimalById);

router.delete("/:id", animal.deleteAnimal);

module.exports = router;