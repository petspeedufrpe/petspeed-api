module.exports = (sequelize, Sequelize) => {
    const Endereco = sequelize.define("endereco", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cep: {
            type: Sequelize.STRING,
        },
        uf: {
            type: Sequelize.STRING,
        },
        cidade: {
            type: Sequelize.STRING,
        },
        bairro: {
            type: Sequelize.STRING,
        },
        numero: {
            type: Sequelize.INTEGER,
        },
        logradouro: {
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