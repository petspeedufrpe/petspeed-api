module.exports = (sequelize, Sequelize) => {
    const Triagem = sequelize.define("triagem", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sintomas: {
            type: Sequelize.STRING,
        },
        outros: {
            type: Sequelize.STRING,
        }
    }, {
        freezeTableName: true,
        tablename: "triagem",
        timestamps: false,
    });
    return Triagem;
}