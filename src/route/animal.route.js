var express = require('express');
var router = express.Router();

const animal = require("../controller/animal.controller.js");

router.post("/cadastrar", animal.create);

router.patch("/editar/:idanimal", animal.update);

router.get("/cliente/:idCliente", animal.getByIdCliente);

router.get("/:id", animal.getById);

router.delete("/:id", animal.delete);

module.exports = router;