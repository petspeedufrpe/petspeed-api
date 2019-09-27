const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT,
	port: process.env.DB_PORT,
	timezone: "-03:00"
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.op = Sequelize.op;

// IMPORTAÇÃO DOS MODELS
db.animal = require("../model/Animal.js")(sequelize, Sequelize);
db.cliente = require("../model/Cliente.js")(sequelize, Sequelize);
db.endereco = require("../model/Endereco.js")(sequelize, Sequelize);
db.medico = require("../model/Medico.js")(sequelize, Sequelize);
db.ordemServico = require("../model/OrdemServico.js")(sequelize, Sequelize);
db.pessoa = require("../model/Pessoa.js")(sequelize, Sequelize);
db.triagem = require("../model/Triagem.js")(sequelize, Sequelize);
db.usuario = require("../model/Usuario.js")(sequelize, Sequelize);
//


// CONSTRUINDO AS RELAÇÕES
db.usuario.hasOne(db.pessoa, {foreignKey: "id"});
db.pessoa.belongsTo(db.usuario, {foreignKey: "idusuario"});

db.pessoa.hasOne(db.cliente, {foreignKey: "id"});
db.usuario.hasOne(db.cliente, {foreignKey: "id"});

db.cliente.belongsTo(db.usuario, {foreignKey: "idusuario"});
db.cliente.belongsTo(db.pessoa, {foreignKey: "idpessoa"});

db.cliente.hasOne(db.animal, {foreignKey: "id"});
db.animal.belongsTo(db.cliente, {foreignKey: "idcliente"});
//

module.exports = db;