module.exports = (sequelize, Sequelize) => {
    const Pessoa = sequelize.define("pessoa", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
        },
        cpf: {
            type: Sequelize.STRING,
        },
        idUsuario: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        }, 
    
    }, {
        freezeTableName: true,
        tableName: "Pessoa",
        timestamps: false
    });
    return Pessoa;
}