const db = require("../config/db.config.js");
const { Cliente, Pessoa, Animal } = db;

exports.criarCliente = async function (req, res) {
    const idpessoa = req.body.idpessoa;
    const profileData = req.body;
    try {
        const pessoa = await Pessoa.findOne({ where: { id: idpessoa } });
        if (pessoa) {
            const cliente = await Cliente.create(profileData);
            return res.send(cliente);
        } else {
            return res.send("Não foi possível realizar o seu cadastro");
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}
exports.editarCliente = async function (req, res) {
    const idcliente = req.params.idcliente;
    const profileData = req.body;
    try {
        const cliente = await Cliente.update(profileData, { where: { id: idcliente } });
        return res.send("Atualizado com sucesso");
    } catch (err) {
        res.send("entrou no catch");
    }
}
exports.encontrarAnimalPorCliente = async function (req, res) {
    try {
        const animais = await Animal.findAll({ where: { idpessoa: req.params.idpessoa }, attributes: ['id', 'nome', 'raca', 'peso', 'nascimento'] });
        if (animais) {
            return res.send(animais);
        } else {
            res.send("Cliente não possui nenhum animal cadastrado")
        }
    } catch (err) {
        res.send(req.params);
    }
}

exports.getByIdUser = async function (req, res) {
    try {
        const cliente = await Cliente.findOne({ where: { idUsuario: req.params.idUser } });
        if (cliente) {
            return res.send(cliente);
        }
        return res.send({ message: "Cliente não encontrado" });
    }
    catch (err) {
        console.log(err);
    }
}
