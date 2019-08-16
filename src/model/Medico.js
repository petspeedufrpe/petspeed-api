module.exports = (sequelize, Sequelize) => {
    const Medico = sequelize.define("medico", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        avaliacao: {
            type: Sequelize.DOUBLE,
        },
        crmv: {
            type: Sequelize.STRING
        },
        telefone: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        tablename: "medico",
        timestamps: false, 
    });
    return Medico;
}