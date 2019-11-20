const db = require("../config/db.config.js");
const { OrdemServico, Medico, Cliente, Animal, Triagem, Pessoa } = db;

exports.create = async function (req, res) {
    let { ordemServico, triagem } = req.body;
    const { idAnimal, idCliente, idMedico } = ordemServico;
    try {
        let transaction;
        transaction = await db.sequelize.transaction();
        const _triagem = await Triagem.create(triagem, { transaction });
        if (_triagem) {
            const animal = await Animal.findOne({ where: { id: idAnimal } });
            const cliente = await Cliente.findOne({ where: { id: idCliente } });
            const medico = await Medico.findOne({ where: { id: idMedico } });
            if (animal && cliente && medico) {
                ordemServico.idTriagem = _triagem.id;
                const _ordemServico = await OrdemServico.create(ordemServico,
                    { transaction });
                await transaction.commit();
                return res.send({ _ordemServico, _triagem });
            } else {
                return res
                    .send(`${!animal ? "Animal" : !cliente ? "Cliente" : "Médico"} não encontrado.`);
            }
        }
        else {
            await transaction.rollback();
            return res.send("Não foi possível criar a ordem de Serviço");
        }
    } catch (err) {
        console.log(err);
        return res.send(err)
    }
}
exports.findById = async function (req, res) {
    const idOrdemServico = req.params.idOrdemServico;

    try {
        const ordemServico = await OrdemServico.findOne({ where: { id: idOrdemServico } });
        if (ordemServico) {
            return res.send(ordemServico);
        } else {
            return res.send("Não existe nenhuma ordem de Serviço");
        }
    } catch (err) {
        return res.send(err);
    }
}
exports.findAll = async function (req, res) {
    try {
        const os = await OrdemServico.findAll();
        if (os) {
            return res.send(os)
        } else {
            return res.send("Não foi encontrada nenhuma OS.")
        }
    } catch (err) {
        return res.send(err)
    }
}
exports.findByIdMedico = async function (req, res) {
    const id = req.params.idMedico;
    try {
        const os = await OrdemServico.findAll({
            where: { idMedico: id },
            include: [
                {
                    model: Cliente,
                    include: [Pessoa]
                },
                { model: Animal },
                { model: Triagem }
            ]
        });
        if (os) {
            return res.send(os);
        } else {
            return res.send("Não foi encontrada nenhuma OS para este médico.")
        }
    } catch (err) {
        res.send(err);
    }
}
exports.findByIdCliente = async function (req, res) {
    const id = req.params.idCliente;
    try {
        const os = await OrdemServico.findAll({ where: { idCliente: id }, include: [{ model: Medico }, { model: Animal }] });
        if (os) {
            return res.send(os);
        } else {
            return res.send("Não foi encontrada nenhuma OS para este cliente")
        }
    } catch (err) {
        console.log(err)
        res.send(err);
    }
}
exports.findByIdAnimal = async function (req, res) {
    const id = req.params.idAnimal;
    try {
        const os = await OrdemServico.findAll({ where: { idAnimal: id }, include: [{ model: Cliente }, { model: Medico }] });
        if (os) {
            return res.send(os);
        } else {
            return res.send("Não foi encontrada nenhuma OS para este animal")
        }
    } catch (err) {
        res.send(err);
    }
}
