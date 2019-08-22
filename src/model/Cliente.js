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
        idusuario: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
        idpessoa: {
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