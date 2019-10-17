const db = require("../config/db.config.js");
const bcrypt = require('bcrypt');
const Usuario = db.usuario;
const Cliente = db.cliente;
const Pessoa = db.pessoa;
const Medico = db.medico;
const Endereco = db.endereco;
var jwt = require('jsonwebtoken');

exports.cadastrarCliente = async function (req, res) {
    let transaction;
    try {
        transaction = await db.sequelize.transaction();
        // Usuario
        const { usuarioData } = req.body;
        let { senha, email } = usuarioData;
        senha = await bcrypt.hash(senha, 10);
        let usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            usuario = await Usuario.create({ email: email, senha: senha }, { transaction });
        } else {
            return res.status(403).send("E-mail já está em uso.");
        }
        // Pessoa
        const { pessoaData } = req.body;
        const { nome, cpf } = pessoaData;
        let pessoa = await Pessoa.findOne({ where: { cpf } });
        if (!pessoa) {
            pessoa = await Pessoa.create({
                nome: nome,
                cpf: cpf,
                idusuario: usuario.id
            }, { transaction });
        } else {
            return res.status(403).send("CPF já cadastrado.");
        }
        // Cliente
        const cliente = await Cliente.create({
            idusuario: usuario.id,
            idpessoa: pessoa.id
        }, { transaction });
        await transaction.commit();
        return res.status(200).send({ "data": { usuario, pessoa, cliente } });
    } catch (err) {
        console.log(err);
        await transaction.rollback();
        return res.status(500).send("Não foi possível realizar o cadastro do cliente.");
    }
}

exports.cadastrarVeterinario = async function (req, res) {
    let transaction;
    try {
        transaction = await db.sequelize.transaction();
        // Usuario
        console.log(req.body);
        let { senha, email } = req.body.usuario;
        senha = await bcrypt.hash(senha, 10);
        let usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            usuario = await Usuario.create({ email: email, senha: senha }, { transaction });
        } else {
            await transaction.rollback();
            return res.status(403).send("E-mail já está em uso.");
        }
        // Pessoa
        const { nome, cpf } = req.body.usuario;
        let pessoa = await Pessoa.findOne({ where: { cpf } });
        if (!pessoa) {
            pessoa = await Pessoa.create({
                nome: nome,
                cpf: cpf,
                idusuario: usuario.id
            }, { transaction });
        } else {
            await transaction.rollback();
            return res.status(403).send("CPF já cadastrado.");
        }
        // Medico
        const { crmv, localcrmv, telefone } = req.body.usuario;
        const medico = await Medico.create({
            crmv: crmv,
            telefone: telefone,
            uf: localcrmv,
            idpessoa: pessoa.id
        }, { transaction });
        // Endereço
        const { endereco, complemento, latitude, longitude } = req.body.endereco;
        const end = await Endereco.create({
            endereco: endereco,
            complemento: complemento,
            latitude: latitude,
            longitude: longitude,
            idpessoa : pessoa.id
        }, { transaction });
        await transaction.commit();
        return res.status(200).send({ "data": { usuario, pessoa, medico, end } });
    } catch (err) {
        console.log(err);
        await transaction.rollback();
        return res.status(500).send("Não foi possível realizar o cadastro do cliente.");
    }
}

exports.criarUsuario = async function (req, res) {
    const profileData = req.body;
    const emailUsuario = req.body.email;
    try {
        if (profileData) {
            profileData.senha = await bcrypt.hash(profileData.senha, 10)
        }
        const usuarioExistente = await Usuario.findOne({ where: { email: emailUsuario } })
        if (!usuarioExistente) {
            const usuario = await Usuario.create(profileData);
        }
        else {
            return res.status(500).send("Já existe este e-mail cadastrado no sistema")
        }
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
        const usuario = await Usuario.findOne({ where: { id } });
        if (usuario) {
            return res.status(200).send(usuario);
        } else {
            return res.status(404).send("Não foi encontrado nenhum usuário");
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.deletarUsuarioPorId = async (req, res) => {
    const id = req.params.idUsuario;

    try {
        const usuario = await Usuario.findOne({ where: { id } });

        if (usuario) {
            usuario.destroy();
            return res.status(200).send(usuario);
        }
        return res.status(400).send({ message: "Usuario não existe" })
    }
    catch (err) {
        return res.status(500).send(err);
    }

}

exports.login = async function (req, res) {
    const profileData = req.body;
    let account = null;
    const { email: emailUsuario } = profileData;
    try {
        const usuario = await Usuario.findOne({
            where: {
                email: emailUsuario
            }
        });
        const pessoa = await Pessoa.findOne({
            where: {
                idUsuario: usuario.id
            }
        });
        if (!usuario) {
            return res.status(400).send({ message: "Email não cadastrado no sistema" });
        }
        const cliente = await Cliente.findOne({
            where: {
                idUsuario: usuario.id
            }
        });
        if (!cliente) {
            const medico = await Medico.findOne({
                where: {
                    idPessoa: pessoa.id
                }
            });
            if (!medico) {
                return res.status(400).send({ message: "dados inváldios" });
            } else {
                account = 'medico'
            }
        } else {
            account = 'cliente'
        }
        const check = await bcrypt.compare(profileData.senha, usuario.senha);
        console.log(check);
        if (check) {
            const { id } = usuario
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 86400 // tempo em segundos (1 dia)
            });
            return res.status(200).send({
                auth: true,
                token: token,
                id: usuario.id
            });
        }

        return res.status(400).send({ message: "Dados inválidos" });
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
}

exports.alterarSenha = async function (req, res) {
    try {
        var { id, senhaAntiga, senhaNova } = req.body;
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            const check = await bcrypt.compare(senhaAntiga, usuario.senha);
            if (check) {
                senhaNova = await bcrypt.hash(senhaNova, 10);
                usuario.update(
                    { senha: senhaNova },
                    { where: { id: id } }
                );
                return res.status(200).send("Senha alterada com sucesso.");
            }
            return res.status(403).send("Senhas não correspondem");
        }
        return res.status(404).send("Usuário não encontrado");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error");
    }
}
exports.isClienteOrMedico = async function(req, res) {
    const idusuario = req.params.idusuario;
    try {
        const pessoa = await Pessoa.findOne({where: {idUsuario : idusuario}});
        const cliente = await Cliente.findOne({where: {idUsuario: idusuario}});
        if (cliente) {
            return res.status(200).send(cliente)
        } else {
           const medico = await Medico.findOne({where:{idPessoa: pessoa.id}});
           if (medico) {
               return res.status(200).send(medico)
           }
        }
    } catch (err) {
        return res.status(500).send("Usuário não encontrado")
    }
}
