const db = require("../config/db.config.js");
const OrdemServico = db.ordemServico;
const Medico = db.medico;
const Cliente = db.cliente;
const Animal = db.animal;
const Triagem = db.triagem;

exports.criarOrdemServico = async function(req, res) {
    const idMedico = req.body.idMedico;
    const idCliente = req.body.idCliente;
    const idAnimal = req.body.idAnimal;
    const idTriagem = req.body.idTriagem
    const profileData = req.body;

    try {
        const animal = await Animal.findOne(idAnimal);
        const cliente = await Cliente.findOne(idCliente);
        const medico = await Medico.findOne(idMedico);
        const triagem = await Triagem.findOne(idTriagem);

        if (animal && cliente && medico) {
            const ordemServico = await OrdemServico.create(profileData);
            return res.status(200).send(ordemServico);
        } else {
            return res.status(500).send("Não foi possível criar a ordem de Serviço");
        }
    } catch (err) {
        return res.status(500).send(err)
    }
}
exports.encontrarOrdemServico = async function(req, res) {
    const idOrdemServico = req.params.idOrdemServico;

    try {
        const ordemServico = await OrdemServico.findOne(idOrdemServico);
        if (ordemServico) {
            return res.status(201).send(ordemServico);
        } else {
            return res.status(404).send("Não existe nenhuma ordem de Serviço");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}
exports.findAllOS = async function(req, res) {
    try {
        const os = await OrdemServico.findAll();
        if (os) {
            return res.status(200).send(os)
        } else {
            return res.status(404).send("Não foi encontrada nenhuma OS.")
        }
    } catch (err) {
        return res.status(500).send(err)
    }
}
exports.getOsByMedico = async function(req, res) {
    const idmedico = req.params.idmedico;
    try {
        const os = await ordemServico.findAll({where: {idmedico: idmedico}, include:[Cliente, Animal]});
        if (os) {
            return res.status(200).send(os);
        } else {
            return res.status(404).send("Não foi encontrada nenhuma OS para este médico.")
        }
    } catch (err) {
        res.status(500).send(err);
    }
}