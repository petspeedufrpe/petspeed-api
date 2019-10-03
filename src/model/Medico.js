module.exports = (sequelize, Sequelize) => {
    const Medico = sequelize.define("medico", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        crmv: {
            type: Sequelize.STRING
        },
        telefone: {
            type: Sequelize.STRING
        },
        uf: {
            type: Sequelize.STRING
        },
        idpessoa: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        }
    }, {
        freezeTableName: true,
        tablename: "medico",
        timestamps: false, 
    });
    return Medico;
}
