module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        email: {
            type: Sequelize.STRING,
        },
        senha: {
            type: Sequelize.STRING,
        },
        foto: {
            type: Sequelize.BLOB('long'),
        },
    },{
        freezeTableName: true,
        tablename: "usuario",
        timestamps: false
    });
    return Usuario;
}