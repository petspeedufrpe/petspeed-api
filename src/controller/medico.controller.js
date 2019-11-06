const db = require("../config/db.config.js");
const Medico = db.medico;
const Pessoa = db.pessoa;
const Endereco = db.endereco;
const Usuario = db.usuario;
const Horario = db.horariosMedico;
const Solicitacao = db.solicitacao;
const OrdemServico = db.ordemServico;
const AgendaMedico = db.agendaMedico;
const Op = db.op;


exports.criarMedico = async function (req, res) {
    const idpessoa = req.body.idpessoa;
    const crmv = req.body.crmv;
    const uf = req.body.uf;
    const profileData = req.body;

    try {
        const pessoa = await Pessoa.findOne({ where: { id: idpessoa } });
        const existeCRMV = await Medico.findOne({ where: { crmv: crmv, uf: uf } });
        if (pessoa && !existeCRMV) {
            const medico = await Medico.create(profileData);
            return res.send(medico);
        } else {
            return res.send("Erro ao cadastrar médico");
        }
    } catch (err) {
        return res.send(err);
    }
}
exports.editarMedico = async function (req, res) {
    const idmedico = req.params.idmedico;
    const profileData = req.body;

    try {
        const medicoEncontrado = await Medico.findOne({ where: { id: idmedico } });
        if (medicoEncontrado) {
            medicoEncontrado.update(profileData);
            return res.send("Dados atualizados com sucesso");
        } else {
            return res.send("Erro ao atualizar");
        }
    } catch (err) {
        return res.send(err);
    }
}

exports.findAllMedicos = async function (req, res) {
    try {
        const medicos = await Medico.findAll({
            include: [
                { model: Pessoa, include: [Endereco, Usuario] },
            ]
        });
        return res.send(medicos);
    } catch (err) {
        console.log(err);
        return res
            .send("Não foi possível retornar a lista de médicos veterinários");
    }
}

exports.findMedicoByNome = async function (req, res) {
    try {
        const medicos = await Medico.findAll({
            include: [
                { model: Pessoa, where: { nome: { [Op.startsWith]: req.body.nome } } }
            ]
        });
        if (medicos.length) {
            return res.send(medicos);
        } return res.send("A busca não encontrou nenhum médico veterinário.");
    } catch (err) {
        console.log(err);
        return res.send("Errou ao buscar médicos veterinários");

    }
}

exports.cadastrarHorario = async function (req, res) {
    try {
        const horario = await Horario.create(req.body);
        return res.send(horario);
    } catch (err) {
        console.log(err);
        return res.send(null);
    }
}

exports.getSolicitacoesByMedico = async function (req, res) {
    try {
        const solicitacoes = await Solicitacao.findAll({
            include: [{
                model: OrdemServico,
                where: { idMedico: req.params.idMedico },
                required: true
            }]
        });
        res.send(solicitacoes);
    } catch (err) {
        console.log(err);
        res.send(null);
    }
}
exports.aceitarSolicitacao = async function (req, res) {
    try {
        const solicit = await Solicitacao.findOne({
            where: {
                id: req.body.idSolicit
            },
            include: [{
                model: OrdemServico
            }]
        });
        if (solicit) {
            const agendar = await AgendaMedico.create({
                idMedico: solicit.ordemServico.idMedico,
                data: solicit.dataPara,
                horaInicio: solicit.dataPara.toTimeString().split(" ")[0],
                horaFim: req.body.horaFim,
                idSolicitacao: solicit.id
            });
            await solicit.update({
                situacao: "confirmada",
                where: { id: solicit.id }
            });
            res.send(agendar);
        }
    } catch (err) {
        console.log(err);
        res.send(null);
    }
}