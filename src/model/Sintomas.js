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
        idTriagem: {
            type:Sequelize.INTEGER,
            foreignKey: true,
        }
    });
}