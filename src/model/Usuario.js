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
        }
    },{
        freezeTableName: true,
        tablename: "usuario",
        timestamps: false
    });
    return Usuario;
}