const db = require("../config/db.config.js");
const Cliente = db.cliente;
const Pessoa = db.pessoa;
const Animal = db.animal

exports.criarCliente = async function(req, res) {
    const idpessoa = req.body.idpessoa;
    const profileData = req.body;
    try {
        const pessoa = await Pessoa.findOne({where: {id: idpessoa}});
        if (pessoa) {
            const cliente = await Cliente.create(profileData);
            return res.status(200).send(cliente);
        } else {
            return res.status(404).send("Não foi possível realizar o seu cadastro");
        }
    } catch (err) {
        res.status(500).send("entrou aqui");
    }
}
exports.editarCliente = async function(req, res) {
    const idcliente = req.params.idcliente;
    const profileData = req.body;
    try {
        const cliente = await Cliente.update(profileData, { where: { id: idcliente}});
            return res.status(200).send("Atualizado com sucesso");
    } catch (err) {
        res.status(500).send("entrou no catch");
    }
}
exports.encontrarAnimalPorCliente = async function(req, res) {
    try {
        const animais = await Animal.findAll({where: {idcliente: req.params.idcliente}, attributes: ['id','nome', 'raca', 'peso', 'nascimento']});
        if (animais) {
            return res.status(200).send(animais);
        } else {
            res.status(404).send("Cliente não possui nenhum animal cadastrado")
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
