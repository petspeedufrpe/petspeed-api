const bcrypt = require('bcrypt');
const db = require("../config/db.config.js");
const { Usuario, Cliente, Pessoa, Medico, Endereco } = db;
var jwt = require('jsonwebtoken');

exports.createCliente = async function (req, res) {
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
            return res.send("E-mail já está em uso.");
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
            return res.send("CPF já cadastrado.");
        }
        // Cliente
        const cliente = await Cliente.create({
            idusuario: usuario.id,
            idpessoa: pessoa.id
        }, { transaction });
        await transaction.commit();
        return res.send({ "data": { usuario, pessoa, cliente } });
    } catch (err) {
        console.log(err);
        await transaction.rollback();
        return res.send("Não foi possível realizar o cadastro do cliente.");
    }
}

exports.createMedico = async function (req, res) {
    let transaction;
    try {
        transaction = await db.sequelize.transaction();
        // Usuario
        let { senha, email } = req.body.usuario;
        senha = await bcrypt.hash(senha, 10);
        let usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            usuario = await Usuario.create({ email: email, senha: senha }, { transaction });
        } else {
            await transaction.rollback();
            return res.send("E-mail já está em uso.");
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
            return res.send("CPF já cadastrado.");
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
            idpessoa: pessoa.id
        }, { transaction });
        await transaction.commit();
        return res.send({ "data": { usuario, pessoa, medico, end } });
    } catch (err) {
        console.log(err);
        await transaction.rollback();
        return res.send("Não foi possível realizar o cadastro do cliente.");
    }
}

exports.create = async function (req, res) {
    const profileData = req.body;
    const emailUsuario = req.body.email;
    try {
        if (profileData) {
            profileData.senha = await bcrypt.hash(profileData.senha, 10)
        }
        const usuarioExistente = await Usuario.findOne({ where: { email: emailUsuario } })
        if (!usuarioExistente) {
            const usuario = await Usuario.create(profileData);
            return res.send(usuario);
        }
        else {
            return res.send("Já existe este e-mail cadastrado no sistema")
        }
    } catch (err) {
        return res.send(err)
    }
}

exports.findById = async (req, res) => {
    const id = req.params.idUsuario;
    console.log(id)
    try {
        const usuario = await Usuario.findOne({ where: { id } });
        if (usuario) {
            return res.send(usuario);
        } else {
            return res.send("Não foi encontrado nenhum usuário");
        }
    } catch (err) {
        res.send(err);
    }
}

exports.delete = async (req, res) => {
    const id = req.params.idUsuario;

    try {
        const usuario = await Usuario.findOne({ where: { id } });

        if (usuario) {
            usuario.destroy();
            return res.send(usuario);
        }
        return res.send({ message: "Usuario não existe" })
    }
    catch (err) {
        return res.send(err);
    }

}

exports.login = async function (req, res) {
    const profileData = req.body;
    let idCliente = null;
    let idMedico = null;
    const { email: emailUsuario } = profileData;
    try {
        const usuario = await Usuario.findOne({
            where: {
                email: emailUsuario
            }
        });
        if (!usuario) {
            return res.send({ message: "Email não cadastrado no sistema" });
        }
        const pessoa = await Pessoa.findOne({
            where: {
                idUsuario: usuario.id
            }
        });
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
                return res.send({ message: "dados inválidos." });
            } else {
                idMedico = medico.id;
            }
        } else {
            idCliente = cliente.id;
        }
        const check = await bcrypt.compare(profileData.senha, usuario.senha);
        if (check) {
            const { id } = usuario
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 86400 // tempo em segundos (1 dia)
            });
            return res.send({
                auth: true,
                token: token,
                user: {
                    nome: pessoa.nome,
                    id: pessoa.id,
                    idUsuario: usuario.id,
                    email: usuario.email,
                    idCliente,
                    idMedico
                }
            });
        }
        return res.send({ message: "Dados inválidos" });
    }
    catch (err) {
        console.log(err);
        return res.send(err.message);
    }
}

exports.updateSenha = async function (req, res) {
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
                return res.send("Senha alterada com sucesso.");
            }
            return res.send("Senhas não correspondem");
        }
        return res.send("Usuário não encontrado");
    } catch (err) {
        console.log(err);
        return res.send("Error");
    }
}
exports.isClienteOrMedico = async function (req, res) {
    const idusuario = req.params.idusuario;
    try {
        const pessoa = await Pessoa.findOne({ where: { idUsuario: idusuario } });
        if (pessoa) {
            const cliente = await Cliente.findOne({ where: { idPessoa: pessoa.id } });
            if (cliente) {
                return res.send(cliente);
            }
            const medico = await Medico.findOne({ where: { idPessoa: pessoa.id } });
            return res.send(medico);
        }
        return res.send("Usuário não encontrado")
    } catch (err) {
        console.log(err);
        return res.send(false);
    }
}
