module.exports = (sequelize, Sequelize) => {
    const Solicitacao = sequelize.define("solicitacao", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dataRealizacao: {
            type: Sequelize.DATE,
        },
        dataPara: {
            type: Sequelize.DATE,
        },
        idOS: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
        situacao: {
            type: Sequelize.STRING,
        }
    }, {
        freezeTableName: true,
        tablename: "solicitacao",
        timestamps: false
    });
    return Solicitacao;
}
