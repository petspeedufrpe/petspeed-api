const db = require("../config/db.config.js")
const Animal = db.animal;
const Cliente = db.cliente;
const Pessoa = db.pessoa;

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
exports.getAnimalById = async function(req, res) {
    const { id } = req.params;
    try {
        const animal = await Animal.findByPk(id, {
            attributes: { exclude: ['id'] },
            include: [
                { model: Cliente,
                attributes: ['avaliacao'],
                include: [Pessoa] }
            ]
        });
        return animal ? res.status(200).send(animal) :
        res.status(404).send("Animal não encontrado");      
    } catch (error) {
        console.log(error);
        return res.status(500).send("Não foi possível recuperar o animal.");
    }
}
exports.getAnimalByIdCliente = async (req, res) => {
    const { idCliente } = req.params;
    try {
        const animais = await Animal.findAll(
            {
                where : { idcliente : idCliente },
                attributes: { exclude: ['idcliente'] }
            }
        )
        return res.status(200).send(animais);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Não foi possível listar os animais do cliente.");
    }
}
exports.deleteAnimal = async (req, res) => {
    const { id } = req.params;
    try {
        await Animal.destroy({
            where: { id : id }
        })
        return res.status(200).send("O animal foi removido.");
    } catch (error) {
        return res.status(500).send("Não foi possível remover o animal.");
    }
}
