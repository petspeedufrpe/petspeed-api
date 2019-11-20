const Sequelize = require("sequelize");

const sequelize = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT,
	port: process.env.DB_PORT,
	timezone: "-03:00",
	define: {
		freezeTableName: true,
		timestamps: false,
	}
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

/*
* Models
*/

db.Usuario = require("../model/Usuario.js")(sequelize, Sequelize);
db.Endereco = require("../model/Endereco.js")(sequelize, Sequelize);
db.Pessoa = require("../model/Pessoa.js")(sequelize, Sequelize);
db.Cliente = require("../model/Cliente.js")(sequelize, Sequelize);
db.Medico = require("../model/Medico.js")(sequelize, Sequelize);
db.Animal = require("../model/Animal.js")(sequelize, Sequelize);
db.Triagem = require("../model/Triagem.js")(sequelize, Sequelize);
db.OrdemServico = require("../model/OrdemServico.js")(sequelize, Sequelize);

/**
 * Relações
 */

db.Pessoa.belongsTo(db.Usuario, { foreignKey: "idusuario" });
db.Pessoa.hasOne(db.Endereco, { foreignKey: "idPessoa" });
db.Pessoa.hasMany(db.Animal, { foreignKey: "idPessoa" });

db.Cliente.belongsTo(db.Usuario, { foreignKey: "idusuario" });
db.Cliente.belongsTo(db.Pessoa, { foreignKey: "idpessoa" });

db.Medico.belongsTo(db.Pessoa, { foreignKey: "idpessoa" });

db.OrdemServico.belongsTo(db.Cliente, { foreignKey: "idCliente" });
db.OrdemServico.belongsTo(db.Animal, { foreignKey: "idAnimal" });
db.OrdemServico.belongsTo(db.Medico, { foreignKey: "idMedico" });
db.OrdemServico.belongsTo(db.Triagem, { foreignKey: "idTriagem" });


module.exports = db;
