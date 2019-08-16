const {env} = process;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USERNAME, env.DB_PASSWORD, {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT,
    operatorsAliases: false,
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

//

module.exports = db;