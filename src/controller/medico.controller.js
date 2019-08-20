const db = require("../config/db.config.js");
const Medico = db.medico;
const Pessoa = db.pessoa;


exports.criarMedico = async function(req, res) {
    const idPessoa = req.body.idPessoa;
    const profileData = req.body;

    try {
        const pessoa = await Pessoa.findOne(idPessoa);
        if(pessoa) {
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
    const idMedico = req.params.idCliente;
    const profileData = req.body;

    try {
        const medico = await Medico.update(profileData, {where:{id: idMedico}});
        if (medico) {
            return res.status(200).send("Dados atualizados com sucesso");
        } else {
            return res.status(500).send("Erro ao atualizar");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}