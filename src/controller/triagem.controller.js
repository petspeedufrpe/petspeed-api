const db = require("../config/db.config.js");
const Triagem = db.triagem;

exports.criarTriagem = async function(req, res) {
    const profileData = req.body;
    try {
        const triagem = await Triagem.create(profileData);
        if (triagem) {
            return res.send(triagem);
        } else {
            return res.send("Não foi possível cadastrar a sua triagem");
        }
    } catch (err) {
        return res.send(err)
    }
}