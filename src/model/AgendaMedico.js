module.exports = (sequelize, Sequelize) => {
    const AgendaMedico = sequelize.define("agendaMedico", {
        idMedico: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
        data: {
            type: Sequelize.DATEONLY,
        },
        horaInicio: {
            type: Sequelize.TIME,
        },
        horaFim: {
            type: Sequelize.TIME,
        },
        idSolicitacao: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            foreignKey: true,
        }
    }, {
        freezeTableName: true,
        tablename: "agendaMedico",
        timestamps: false
    });
    return AgendaMedico;
}
