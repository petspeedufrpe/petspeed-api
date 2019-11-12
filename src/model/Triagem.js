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
        tablename: "triagem",
    });
    return Triagem;
}
