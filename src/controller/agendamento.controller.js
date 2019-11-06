const db = require("../config/db.config.js")
const HorariosMedico = db.horariosMedico;
const AgendaMedico = db.agendaMedico;
const Pessoa = db.pessoa;

exports.verificarDias = async function (req, res) {
    let dias = [false, false, false, false, false, false, false];
    const idMedico = req.params.idMedico;
    try {
        const horarios = await HorariosMedico.findAll({
            where: {
                idMedico: idMedico
            }
        });
        horarios.forEach(element => {
            dias[element.dia - 1] = element;
        });
        return res.send(dias);
    } catch (err) {
        console.log(err);
        return res.send(null);
    }
}

exports.verificarHorarios = async function (req, res) {
    let horarios = [];
    const data = req.body.data;
    try {
        horarios = await AgendaMedico.findAll({
            where: {
                idMedico: req.params.idMedico,
                data: data
            }
        });
        return res.send(horarios);
    } catch (err) {
        console.log(err);
        return res.send(null);
    }
}

