const db = require("../config/db.config.js");
const { Pessoa, Usuario, Endereco } = db;

exports.create = async function (req, res) {
  const idusuario = req.body.idusuario;
  const profileData = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { id: idusuario } });
    if (usuario) {
      const pessoa = await Pessoa.create(profileData);
      return res.send(pessoa);
    }
    return res.send("Não foi possível encontrar o usuário.");
  } catch (err) {
    return res.send(err.message);
  }
};

exports.update = async function (req, res) {
  const { idpessoa } = req.params;
  const profileData = req.body;
  try {
    const pessoaEncontrada = await Pessoa.findOne({ where: { id: idpessoa } });
    if (pessoaEncontrada) {
      await pessoaEncontrada.update(profileData);
      return res.send("Atualizado com sucesso");
    }
    return res.send("Pessoa não encontrada.");
  } catch (err) {
    res.send(err.message);
  }
};

exports.createAddress = async function (req, res) {
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
    return res.send(err.message);
  }
}

exports.findById = async function (req, res) {
  try {
    const pessoa = await Pessoa.findByPk(req.params.id);
    res.send(pessoa);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
}

exports.findByIdUsuario = async function (req, res) {
  idusuario = req.params.idusuario;
  try {
    const pessoa = await Pessoa.findOne({ where: { idusuario: idusuario }, include: [Usuario] })
    if (pessoa) {
      return res.send(pessoa);
    }
    return res.send("Não foi encontrada nenhuma pessoa");
  } catch (err) {
    res.send(err.message);
  }
}
