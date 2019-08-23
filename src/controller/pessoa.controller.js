const db = require("../config/db.config.js");
const Pessoa = db.pessoa;
const Usuario = db.usuario;

exports.criarPessoa = async function(req, res) {
    const idusuario = req.body.idusuario;
    const profileData = req.body;

    try {
        const usuario = await Usuario.findOne({where: {id: idusuario}});
        if (usuario) {
            const pessoa = await Pessoa.create(profileData);
            return res.status(200).send(pessoa);
        } else {
            return res.status(404).send("Não foi possível encontrar o usuário.");
        }
    } catch (err) {
        return res.status(500).send("entrou no catch");
    }
}
exports.editarPessoa = async function(req, res) {
    const idpessoa = req.params.idpessoa;
    const profileData = req.body;

    try {
        const pessoaEncontrada = await Pessoa.findOne({ where: { id: idpessoa}});
        if (pessoaEncontrada) {
            pessoaEncontrada.update(profileData);
            return res.status(200).send("Atualizado com sucesso");
        } else {
            return res.status(404).send("Pessoa não encontrada.");
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
