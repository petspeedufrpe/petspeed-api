const db = require("../config/db.config.js");
const events = require("events");
const eventEmitter = new events.EventEmitter();
const Pessoa = db.pessoa;
const Usuario = db.usuario;
const Endereco = db.endereco;
const googleMapsClient = require("@google/maps").createClient({
	key: process.env.API_KEY
});

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
    const { idpessoa } = req.params
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

async function dbInsert(req, res, data) {
    const { cep, cidade, bairro, logradouro, numero, idpessoa } = req.body;
    const {lat: latitude, lng:longitude} = data
    try {
        const pessoa = await Pessoa.findByPk(idpessoa);
        if (pessoa) {
            const endereco = await Endereco.create(
                {
                    cep, cidade, bairro, logradouro, numero, idpessoa, latitude, longitude
                }
            );
            return res.status(200).send(endereco);
        } return res.status(404).send("Pessoa não encontrada");
        
    } catch (err) {
        console.log(err);
        return res.status(500).send("Não foi possível cadastrar o endereço"); 
    }
}

exports.create = async function(req, res) {
    const { cidade, bairro, logradouro, numero, } = req.body;
	await googleMapsClient.geocode({ address: `${logradouro} ${numero} ${bairro} ${cidade}` }, function(
		err,
		response
	) {
		if (!err) {
			if (response.json.status === "ZERO_RESULTS") {
				res.status(400).send("Endereço mal formatado");
			} else {
				const ret = response.json.results[0].geometry.location;
				eventEmitter.addListener("coords", dbInsert(req, res, ret));
				eventEmitter.emit("coords");
			}
		} else {
			res.status(400).send("Endereco vazio");
		}
	});
};

exports.encontrarAnimalPorPessoa = async function(req, res) {
    try {
        const animais = await Animal.findAll({where: {idPessoa: req.params.idPessoa}, attributes: ['id','nome', 'raca', 'peso', 'nascimento']});
        if (animais) {
            return res.status(200).send(animais);
        } else {
            res.status(404).send("Cliente não possui nenhum animal cadastrado")
        }
    } catch (err) {
        res.status(500).send(err);
    }
