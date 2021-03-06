module.exports = (sequelize, Sequelize) => {
    const OrdemServico = sequelize.define("ordemServico", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descricao: {
            type: Sequelize.STRING,
        },
        idMedico: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
        idCliente: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
        idAnimal: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
        idTriagem: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
        status: {
            type: Sequelize.STRING,
        },
        prioridade: {
            type: Sequelize.INTEGER,
        }
    }, {
        freezeTableName: true,
        tablename: "ordemServico",
        timestamps: false
    });
    return OrdemServico;
}
