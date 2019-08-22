const db = require("../config/db.config.js");
const Pessoa = db.pessoa;
const Usuario = db.usuario;

exports.criarPessoa = async function(req, res) {
    const idUsuario = req.params.idUsuario;
    const profileData = req.body;

    try {
        const usuario = await Usuario.findOne({where: {id: idUsuario}});
        if (usuario) {
            const pessoa = await Pessoa.create(profileData, usuario.id);
            return res.status(200).send(pessoa);
        } else {
            return res.status(404).send("Não foi possível encontrar o usuário.");
        }
    } catch (err) {
        return res.status(500).send("entrou no catch");
    }
}
exports.editarPessoa = async function(req, res) {
    const idPessoa = req.params.idPessoa;
    const profileData = req.body;

    try {
        const pessoa = await Pessoa.update(profileData, { where: { id: idPessoa}});
        res.status(200).send(pessoa);
    } catch (err) {
        res.status(500).send(err);
    }
}
