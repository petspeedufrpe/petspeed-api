const db = require("../config/db.config.js");
const Triagem = db.triagem;
const Sintomas = db.sintomas;


exports.criarSintomas = async function(req, res) {
    const idTriagem = req.body.idTriagem;
    const profileData = req.body;

    try {
        const triagem = await Triagem.findOne(idTriagem);
        if (triagem) {
            const sintomas = await Sintomas.create(profileData);
            return res.status(200).send(sintomas);
        } else {
            return res.status(404).send("Não foi encontrada nenhuma triagem")
        }
    } catch(err) {
        res.status(500).send(err);
    }
}