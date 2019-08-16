const db = require("../config/db.config.js")
const Animal = db.animal;
const Cliente = db.cliente;

exports.criarAnimal = async function(req, res) {
    const idCliente = req.body.idCliente;
    const profileData = req.body;

    try {
        const cliente = await Cliente.findOne(idCliente);
        if (cliente) {
            const animal = await animal.create(profileData);
            res.status(200).send("Animal cadastrado com sucesso");
        } else {
            res.status(404).send("O cadastro não pôde ser realizado");
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
exports.editarAnimal = async function(req, res) {
    const idAnimal = req.params.idAnimal;
    const profileData = req.body;

    try {
        const animal = await Animal.update(profileData, {where: {id: idAnimal}});
        if (animal) {
            return res.status(200).send("Dados atualizados com sucesso.")
        } else {
            return res.status(500).send("Não foi possível atualizar os seus dados.")
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}
