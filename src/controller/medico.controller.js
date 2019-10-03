const db = require("../config/db.config.js");
const Medico = db.medico;
const Pessoa = db.pessoa;


exports.criarMedico = async function(req, res) {
    const idpessoa = req.body.idpessoa;
    const crmv = req.body.crmv;
    const uf = req.body.uf;
    const profileData = req.body;

    try {
        const pessoa = await Pessoa.findOne({where: {idpessoa}});
        const existeCRMV = await Medico.findOne({where: {crmv: crmv}});
        if(pessoa && != existeCRMV) {
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
