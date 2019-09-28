const db = require("../config/db.config.js");
const bcrypt = require('bcrypt');
const Usuario = db.usuario;
const Cliente = db.cliente;
var jwt = require('jsonwebtoken');

exports.criarUsuario = async function(req, res) {
    const profileData = req.body;
    try {
        if(profileData){
            profileData.senha = await bcrypt.hash(profileData.senha,10)
        }
        const usuario = await Usuario.create(profileData);
        if (usuario) {
            return res.status(200).send(usuario);
        } else {
            return res.status(500).send("Não foi possível realizar cadastro de usuário")
        }
    } catch (err) {
        return res.status(500).send(err)
    }
}
exports.encontrarUsuarioPorId = async (req, res) => {
    const id = req.params.idUsuario;
    console.log(id)
    try {
        const usuario = await Usuario.findOne({where: {id}});
        if (usuario) {
            return res.status(200).send(usuario);
        } else {
            return res.status(404).send("Não foi encontrado nenhum usuário");
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.deletarUsuarioPorId = async (req, res) =>{
    const id = req.params.idUsuario;
    
    try{
    const usuario = await Usuario.findOne({where:{id}});

    if (usuario) {
        usuario.destroy();
        return res.status(200).send(usuario);
    }
    return res.status(400).send({message:"Usuario não existe"})
    }
    catch(err){
        return res.status(500).send(err);
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
        });
        if(!usuario){
            return res.status(400).send({message:"Email não cadastrado no sistema"});
        }
        const cliente = await Cliente.findOne({
            where: {
                 idUsuario: usuario.id}
        });
        if(!cliente){ 
            return res.status(400).send({message:"Cliente não encontrado"});
        }
        const check = await bcrypt.compare(profileData.senha,usuario.senha);
        console.log(check);
        if(check){
            const { id } = usuario
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 86400 // tempo em segundos (1 dia)
              });
              return res.status(200).send({ 
                  auth: true,
                  token: token, 
                  user: {
                      id: usuario.id, 
                      email: usuario.email
                  } 
              });
        }
        
        return res.status(400).send({message:"Dados inválidos"});
    }
    catch(err){
        return res.status(500).send({message:"Bad Gateway"})
    }
}