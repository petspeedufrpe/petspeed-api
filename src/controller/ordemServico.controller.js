const db = require("../config/db.config.js");
const OrdemServico = db.ordemServico;
const Medico = db.medico;
const Pessoa = db.pessoa;
const Cliente = db.cliente;
const Animal = db.animal;
const Triagem = db.triagem;
const Pessoa = db.pessoa;
exports.criarOrdemServico = async function(req, res) {
    const idMedico = req.body.idMedico;
    const idPessoa = req.body.idPessoa;
    const idAnimal = req.body.idAnimal;
    const idtriagem = req.body.idtriagem;
    const idCliente = req.body.idCliente;
    const profileData = req.body;

    try {
        const animal = await Animal.findOne({where: {id: idAnimal}});
        const pessoa = await Pessoa.findOne({where: {id:idPessoa}});
        const medico = await Medico.findOne({where: {id: idMedico}});
        const cliente = await Cliente.findOne({where: {id: idCliente}});
        const triagem = await Triagem.findOne({where: {id: idtriagem}});

        if (animal && cliente && pessoa && medico && triagem) {
            const ordemServico = await OrdemServico.create(profileData);
            return res.status(200).send(ordemServico);
        } else {
            return res.status(500).send("Não foi possível criar a ordem de Serviço");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}
exports.encontrarOrdemServico = async function(req, res) {
    const idOrdemServico = req.params.idOrdemServico;

    try {
        const ordemServico = await OrdemServico.findOne({where: {id: idOrdemServico}});
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
    const id = req.params.idMedico;
    try {
        const os = await OrdemServico.findAll({where: {idMedico: id},include:[{model:Cliente}, {model: Animal}, {model: Triagem}]});
        if (os) {
            return res.status(200).send(os);
        } else {
            return res.status(404).send("Não foi encontrada nenhuma OS para este médico.")
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
exports.getOsByCliente = async function(req, res) {
    const { idCliente } = req.params;
    try {
        const os = await OrdemServico.findAll({where: {idPessoa: idCliente}, {excluide: ['idcliente'], include:[{model: Medico}, {model: Animal}]});
        if (os) {
            return res.status(200).send(os);
        } else {
            return res.status(404).send("Não foi encontrada nenhuma OS para este cliente")
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
}
exports.getOsByAnimal = async function(req, res) {
    const id = req.params.idAnimal;
    try {
        const os = await OrdemServico.findAll({where: {idAnimal: id}, include:[{model: Cliente}, {model: Medico}]});
        if (os) {
            return res.status(200).send(os);
        } else {
            return res.status(404).send("Não foi encontrada nenhuma OS para este animal")
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
