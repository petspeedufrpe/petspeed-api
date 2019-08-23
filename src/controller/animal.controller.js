const db = require("../config/db.config.js")
const Animal = db.animal;
const Cliente = db.cliente;

exports.criarAnimal = async function(req, res) {
    const idcliente = req.body.idcliente;
    const profileData = req.body;

    try {
        const cliente = await Cliente.findOne({where: {id: idcliente}});
        if (cliente) {
            const animal = await Animal.create(profileData);
            res.status(200).send("Animal cadastrado com sucesso");
        } else {
            res.status(404).send("O cadastro não pôde ser realizado");
        }
    } catch (err) {
        res.status(500).send("entrou no catch");
    }
}
exports.editarAnimal = async function(req, res) {
    const idanimal = req.params.idanimal;
    const profileData = req.body;

    try {
        const animalEncontrado = await Animal.findOne({where: {id: idanimal}})
        if (animalEncontrado) {
            animalEncontrado.update(profileData);
            return res.status(200).send("Dados atualizados com sucesso.")
        } else {
            return res.status(500).send("Não foi possível atualizar os seus dados.")
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}
