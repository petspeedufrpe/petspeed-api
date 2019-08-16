const db = require("../config/db.config.js");
const Cliente = db.cliente;
const Pessoa = db.pessoa;

exports.criarCliente = async function(req, res) {
    const idPessoa = req.body.idPessoa;
    const profileData = req.body;
    try {
        const pessoa = await Pessoa.findOne(idPessoa);
        if (pessoa) {
            const cliente = await Cliente.create(profileData);
            return res.status(200).send(cliente);
        }
    } catch (err) {
        res.status(500).send("Não foi possível realizar o seu cadastro");
    }
}
