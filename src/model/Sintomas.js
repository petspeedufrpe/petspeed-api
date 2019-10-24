module.exports = (sequelize,Sequelize)=>{
    const Sintoma = Sequelize.define("Sintomas",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true            
        },
        nome:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        descricao: {
            type: Sequelize.STRING,
        },
        idTriagem: {
            type:Sequelize.INTEGER,
            foreignKey: true,
        }
    });
}