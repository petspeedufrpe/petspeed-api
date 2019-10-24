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
        idmedico: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
        idcliente: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
        idanimal: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
        idtriagem: {
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