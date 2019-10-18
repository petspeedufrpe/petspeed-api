module.exports = (sequelize, Sequelize) => {
    const Animal = sequelize.define("animal", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
        },
        raca: {
            type: Sequelize.STRING,
        },
        peso: {
            type: Sequelize.DOUBLE,
        },
        nascimento: {
            type: Sequelize.INTEGER,
        },
        foto: {
            type: Sequelize.BLOB('long'),
        },
        idPessoa: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
        tipo: {
            type: Sequelize.STRING,
        }
    }, {
        freezeTableName: true,
        tablename: "animal",
        timestamps: false
    });
    return Animal;
}
