const db = require("../config/db.config.js");
const { Animal, Cliente } = db;

exports.create = async function (req, res) {
    const idPessoa = req.body.idPessoa;
    const profileData = req.body;
    try {
        const pessoa = await Pessoa.findOne({ where: { id: idPessoa } });
        if (pessoa) {
            const animal = await Animal.create(profileData);
            res.send("Animal cadastrado com sucesso");
        } else {
            res.send("Não foi possível cadastrar");
        }
    } catch (err) {
        res.send(err.message);
    }
}
exports.update = async function (req, res) {
    const idanimal = req.params.idanimal;
    const profileData = req.body;

    try {
        const animalEncontrado = await Animal.findOne({ where: { id: idanimal } })
        if (animalEncontrado) {
            const response = await animalEncontrado.update(profileData);
            return res.send("Dados atualizados com sucesso.")
        } else {
            return res.send("Não foi possível atualizar os seus dados.")
        }
    } catch (err) {
        return res.send(err);
    }
}
exports.getById = async function (req, res) {
    const { id } = req.params;
    try {
        const animal = await Animal.findByPk(id, {
            attributes: { exclude: ['id'] },
            include: [
                {
                    model: Cliente,
                    attributes: ['avaliacao'],
                    include: [Pessoa]
                }
            ]
        });
        return animal ? res.send(animal) :
            res.send("Animal não encontrado");
    } catch (error) {
        console.log(error);
        return res.send("Não foi possível recuperar o animal.");
    }
}
exports.getByIdCliente = async (req, res) => {
    const { idCliente } = req.params;
    try {
        const animais = await Animal.findAll(
            {
                where: { idPessoa: idCliente },
                attributes: { exclude: ['idcliente'] }
            }
        )
        return res.send(animais);
    } catch (error) {
        console.log(error);
        return res.send("Não foi possível listar os animais do cliente.");
    }
}
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await Animal.destroy({
            where: { id: id }
        })
        return res.send("O animal foi removido.");
    } catch (error) {
        return res.send("Não foi possível remover o animal.");
    }
}
