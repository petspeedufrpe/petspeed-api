module.exports = (sequelize, Sequelize) => {
    const HorarioMedico = sequelize.define("horarioMedico", {
        idMedico: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            foreignKey: true,
        },
        dia: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        horaInicio: {
            type: Sequelize.TIME,
        },
        horaFim: {
            type: Sequelize.TIME,
        }
    }, {
        freezeTableName: true,
        tablename: "horarioMedico",
        timestamps: false
    });
    return HorarioMedico;
}
