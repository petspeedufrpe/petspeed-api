const db = require("../config/db.config.js");
const Pessoa = db.pessoa;
const Usuario = db.usuario;
const Endereco = db.endereco;

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

exports.cadastrarEndereco = async function(req, res) {
    const { cidade, bairro, rua, numero, idpessoa } = req.body;
    try {
        const pessoa = await Pessoa.findByPk(idpessoa);
        if (pessoa) {
            const endereco = await Endereco.create(
                {
                    cidade, bairro, rua, numero, idpessoa
                }
            );
            return res.status(200).send(endereco);
        } return res.status(404).send("Pessoa não encontrada");
        
    } catch (err) {
        console.log(err);
        return res.status(500).send("Não foi possível cadastrar o endereço"); 
    }
}
