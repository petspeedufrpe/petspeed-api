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
            return res.send(medico);
        } else {
            return res.send("Erro ao cadastrar médico");
        }
    } catch(err) {
        return res.send(err);
    }
}
exports.editarMedico = async function(req, res) {
    const idmedico = req.params.idmedico;
    const profileData = req.body;

    try {
        const medicoEncontrado = await Medico.findOne({where:{id: idmedico}});
        if (medicoEncontrado) {
            medicoEncontrado.update(profileData);
            return res.send("Dados atualizados com sucesso");
        } else {
            return res.send("Erro ao atualizar");
        }
    } catch (err) {
        return res.send(err);
    }
}

exports.findAllMedicos = async function(req, res) {
    try {
        const medicos = await Medico.findAll({
            include: [
                {model: Pessoa, include: [Endereco, Usuario]},
            ]
        });
        return res.send(medicos);
    } catch (err) {
        console.log(err);
        return res
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
            return res.send(medicos);
        } return res.send("A busca não encontrou nenhum médico veterinário.");
    } catch (err) {
        console.log(err);
        return res.send("Errou ao buscar médicos veterinários");
        
    }
}
