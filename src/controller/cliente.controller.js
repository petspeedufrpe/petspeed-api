const db = require("../config/db.config.js");
const Cliente = db.cliente;
const Pessoa = db.pessoa;
const Animal = db.animal;
const Usuario = db.usuario;

exports.criarCliente = async function(req, res) {
    const idpessoa = req.body.idpessoa;
    const profileData = req.body;
    try {
        const pessoa = await Pessoa.findOne({where: {id: idpessoa}});
        if (pessoa) {
            const cliente = await Cliente.create(profileData);
            return res.status(200).send(cliente);
        } else {
            return res.status(404).send("Não foi possível realizar o seu cadastro");
        }
    } catch (err) {
        res.status(500).send("entrou aqui");
    }
}
exports.editarCliente = async function(req, res) {
    const idcliente = req.params.idcliente;
    const profileData = req.body;
    try {
        const cliente = await Cliente.update(profileData, { where: { id: idcliente}});
            return res.status(200).send("Atualizado com sucesso");
    } catch (err) {
        res.status(500).send("entrou no catch");
    }
}
exports.encontrarAnimalPorCliente = async function(req, res) {
    try {
        const animais = await Animal.findAll({where: {idcliente: req.params.idcliente}, attributes: ['nome', 'raca', 'peso', 'nascimento']});
        if (animais) {
            return res.status(200).send(animais);
        } else {
            res.status(404).send("Cliente não possui nenhum animal cadastrado")
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.login = async function(req,res){
    const profileData = req.body;
    const {email:emailUsuario} = profileData;
    try{ 
        const usuario = await Usuario.findOne({
            where: { 
                email: emailUsuario
            }
        })

        if(!usuario){
            return res.status(400).send("Email não cadastrado no sistema");
        }

        const cliente = await Cliente.findOne({
            where: {
                 idusuario: usuario.id}
        });

        if(!cliente){ 
            return res.status(400).send("Cliente não encontrado");
        }
        if(usuario.senha === req.body.senha){
          return res.status(200).send("Logado com Sucesso");
          //TODO
        }
        
        return res.status(400).send("Dados inválidos");
    }
    catch(err){
        return res.status(500).send("Bad Gateway")
    }
}
