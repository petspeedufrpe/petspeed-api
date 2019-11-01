const db = require("../config/db.config.js");
const events = require("events");
const eventEmitter = new events.EventEmitter();
const Pessoa = db.pessoa;
const Usuario = db.usuario;
const Endereco = db.endereco;
const multer = require('multer');
const googleMapsClient = require("@google/maps").createClient({
  key: process.env.API_KEY
});

exports.criarPessoa = async function(req, res) {
  const idusuario = req.body.idusuario;
  const profileData = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { id: idusuario } });
    if (usuario) {
      const pessoa = await Pessoa.create(profileData);
      return res.send(pessoa);
    } else {
      return res.send("Não foi possível encontrar o usuário.");
    }
  } catch (err) {
    return res.send("entrou no catch");
  }
};
exports.editarPessoa = async function(req, res) {
  console.log('EU ENTREI AQUI ?????')
  const { idpessoa } = req.params;
  const profileData = req.body;
  const image = req.file;
  console.log(image);
  try {
    const pessoaEncontrada = await Pessoa.findOne({ where: { id: idpessoa } });
    if (pessoaEncontrada) {
      await pessoaEncontrada.update(profileData);
      return res.send("Atualizado com sucesso");
    } else {
      return res.send("Pessoa não encontrada.");
    }
  } catch (err) {
    res.send(err);
  }
};

exports.dbInsert = async function(req, res) {
  const { endereco, complemento, idpessoa, latitude, longitude } = req.body;
  try {
    const pessoa = await Pessoa.findByPk(idpessoa);
    if (pessoa) {
      const adress = await Endereco.create({
        endereco,
        complemento,
        idpessoa,
        latitude,
        longitude
      });
      return res.send(adress);
    }
    return res.send("Pessoa não encontrada");
  } catch (err) {
    console.log(err);
    return res.send("Não foi possível cadastrar o endereço");
  }
};

exports.findByPk = async function(req, res) {
  try {
    const pessoa = await Pessoa.findByPk(req.params.id);
    res.send(pessoa);
  } catch (err) {
    console.log(err);
    res.send("Erro");
  }
};
exports.findByIdUsuario = async function(req, res) {
  idusuario = req.params.idusuario;
  try {
    const pessoa = await Pessoa.findOne({where: {idusuario: idusuario}, include:[Usuario]})
    if (pessoa) {
      return res.send(pessoa)
    }
    else {
      return res.send("Não foi encontrada nenhuma pessoa")
    }
  } catch (err) {
    res.send(err)
  }
}
