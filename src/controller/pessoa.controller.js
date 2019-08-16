const db = require("../config/db.config.js");
const Pessoa = db.pessoa;
const Usuario = db.usuario;

exports.criarPessoa = async function(req, res) {
    const idUsuario = req.body.idUsuario;
    const profileData = req.body;

    try {
        const usuario = await Usuario.findOne(idUsuario);

        if (usuario) {
            const pessoa = await Pessoa.create(profileData);
            return res.status(200).send(pessoa);
        } else {
            return res.status(404).send("Não foi possível encontrar o usuário.");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}
