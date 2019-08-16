const db = require("../config/db.config.js");
const Cliente = db.cliente;
const Pessoa = db.pessoa;
const Animal = db.animal;

exports.criarCliente = async function(req, res) {
    const idPessoa = req.body.idPessoa;
    const profileData = req.body;
    try {
        const pessoa = await Pessoa.findOne(idPessoa);
        if (pessoa) {
            const cliente = await Cliente.create(profileData);
            return res.status(200).send(cliente);
        } else {
            return res.status(404).send("Não foi possível realizar o seu cadastro");
        }
    } catch (err) {
        res.status(500).send("Não foi possível realizar o seu cadastro");
    }
}
exports.editarCliente = async function(req, res) {
    const idCliente = req.params.idCliente;
    const profileData = req.body;

    try {
        const cliente = await Cliente.update(profileData, {where: {id: idCliente}});
        if (cliente) {
            return res.status(200).send("Atualizado com sucesso");
        } else {
            return res.status(500).send("Não foi possível atualizar os seus dados");
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
exports.encontrarAnimalPorCliente = async function(req, res) {
    try {
        const animais = await Animal.findAll({where: {idCliente: req.params.idCliente}, attributes: ['nome', 'raca', 'peso', 'nascimento']});
        if (animais) {
            return res.status(200).send(animais);
        } else {
            res.status(404).send("Cliente não possui nenhum animal cadastrado")
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
