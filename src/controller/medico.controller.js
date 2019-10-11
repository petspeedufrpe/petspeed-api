const db = require("../config/db.config.js");
const Medico = db.medico;
const Pessoa = db.pessoa;
const Endereco = db.endereco;
const Usuario = db.usuario;
const Op = db.op;


exports.criarMedico = async function(req, res) {
    const idpessoa = req.body.idpessoa;
    const crmv = req.body.crmv;
    const uf = req.body.uf;
    const profileData = req.body;

    try {
        const pessoa = await Pessoa.findOne({where: {id: idpessoa}});
        const existeCRMV = await Medico.findOne({where: {crmv: crmv, uf: uf}});
        if(pessoa && !existeCRMV) {
            const medico = await Medico.create(profileData);
            return res.status(200).send(medico);
        } else {
            return res.status(500).send("Erro ao cadastrar médico");
        }
    } catch(err) {
        return res.status(500).send(err);
    }
}
exports.editarMedico = async function(req, res) {
    const idmedico = req.params.idmedico;
    const profileData = req.body;

    try {
        const medicoEncontrado = await Medico.findOne({where:{id: idmedico}});
        if (medicoEncontrado) {
            medicoEncontrado.update(profileData);
            return res.status(200).send("Dados atualizados com sucesso");
        } else {
            return res.status(500).send("Erro ao atualizar");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}

exports.findAllMedicos = async function(req, res) {
    try {
        const medicos = await Medico.findAll({
            include: [
                {model: Pessoa, include: [Endereco, Usuario]},
            ]
        });
        return res.status(200).send(medicos);
    } catch (err) {
        console.log(err);
        return res.status(500)
        .send("Não foi possível retornar a lista de médicos veterinários");
    }
}

exports.findMedicoByNome = async function(req, res){
    try {
        const medicos = await Medico.findAll({
            include: [
                {model: Pessoa, where: { nome : {[Op.startsWith] : req.body.nome}}}
            ]
        });
        if (medicos.length) {
            return res.status(200).send(medicos);
        } return res.status(404).send("A busca não encontrou nenhum médico veterinário.");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Errou ao buscar médicos veterinários");
        
    }
}
