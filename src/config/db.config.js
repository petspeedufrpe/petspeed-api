const Sequelize = require("sequelize");
const database = "petspeedDB";
const username = "petspeed";
const password = "petspeed2019";
const host = "3.227.177.245";
const dialect = "postgres";
const port = '5432';
const sequelize = new Sequelize(database, username, password, {
	host: host,
	dialect: dialect,
	operatorsAliases: false,
	port: port,
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

db.cliente.belongsTo(db.usuario, {foreignKey: "idusuario"});
db.cliente.belongsTo(db.pessoa, {foreignKey:""})
//

module.exports = db;