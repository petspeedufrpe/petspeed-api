module.exports = (sequelize, Sequelize) => {
    const Endereco = sequelize.define("endereco", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        endereco: {
            type: Sequelize.STRING,
        },
        complemento: {
            type: Sequelize.STRING,
        },
        idpessoa: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
        latitude: {
            type: Sequelize.DOUBLE,
        },
        longitude: {
            type: Sequelize.DOUBLE,
        }
    }, {
        freezeTableName: true,
        tablename: "endereco",
        timestamps: false,
    });
    return Endereco;
}