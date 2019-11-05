const db = require("../config/db.config.js");
const OrdemServico = db.ordemServico;
const Medico = db.medico;
const Cliente = db.cliente;
const Animal = db.animal;
const Triagem = db.triagem;
const Pessoa = db.pessoa;
const Solicitacao = db.solicitacao;

exports.criarordemServico = async function (req, res) {
    let { ordemServico, triagem } = req.body;
    console.log(ordemServico);
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
exports.encontrarOrdemServico = async function (req, res) {
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
exports.criarOrdemServico = async function (req, res) {
    const idMedico = req.body.idMedico;
    const idCliente = req.body.idCliente;
    const idAnimal = req.body.idAnimal;
    const idtriagem = req.body.idtriagem;
    const profileData = req.body;
    try {
        const animal = await Animal.findOne({ where: { id: idAnimal } });
        const cliente = await Cliente.findOne({ where: { id: idCliente } });
        const medico = await Medico.findOne({ where: { id: idMedico } });
        const triagem = await Triagem.findOne({ where: { id: idtriagem } });

        if (animal && cliente && medico && triagem) {
            const ordemServico = await OrdemServico.create(profileData);
            return res.send(ordemServico);
        } else {
            return res.send("Não foi possível criar a ordem de Serviço");
        }
    } catch (err) {
        console.log(err);
        return res.send(err);
    }
}
exports.findAllOS = async function (req, res) {
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
exports.getOsByMedico = async function (req, res) {
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
exports.getOsByCliente = async function (req, res) {
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
exports.getOsByAnimal = async function (req, res) {
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
exports.solicitarAgendamento = async function (req, res) {
    try {
        const solicitacao = await Solicitacao.create(req.body);
        return res.send(solicitacao);
    } catch (err) {
        console.log(err);
        return res.send(null);
    }
}
