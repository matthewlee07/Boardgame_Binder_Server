let Sequelize = require('sequelize');

let sequelize = new Sequelize(process.env.DATABASE_URL, null, null, {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: true //false

});

sequelize.sync();

module.exports = sequelize
