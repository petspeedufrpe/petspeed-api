const db = require("../config/db.config.js");
const { Triagem, Sintomas } = db;

exports.criarSintomas = async function (req, res) {
    const idTriagem = req.body.idTriagem;
    const profileData = req.body;
    try {
        const triagem = await Triagem.findOne(idTriagem);
        if (triagem) {
            const sintomas = await Sintomas.create(profileData);
            return res.send(sintomas);
        } else {
            return res.send("Não foi encontrada nenhuma triagem");
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}
