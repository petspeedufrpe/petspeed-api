module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        avaliacao: {
            type: Sequelize.DOUBLE,
        },
        idUsuario: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
        idPessoa: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        }
    }, {
        freezeTableName: true,
        tablename: "cliente",
        timestamps: false
    });
    return Cliente;
}