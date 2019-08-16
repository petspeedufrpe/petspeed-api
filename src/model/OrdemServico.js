module.exports = (sequelize, Sequelize) => {
    const OrdemServico = sequelize.define("ordemServico", {
        id: {
            type: Sequelize.INTEGER,
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
        }
    }, {
        freezeTableName: true,
        tablename: "ordemServico",
        timestamps: false
    });
    return OrdemServico;
}