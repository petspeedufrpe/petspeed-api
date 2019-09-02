const db = require("../config/db.config.js");
const Usuario = db.usuario;

exports.criarUsuario = async function(req, res) {
    const profileData = req.body;

    try {
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