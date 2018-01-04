let Sequelize = require('sequelize');

let sequelize = new Sequelize('mainDB', null, null, {
    dialect: "sqlite",
    storage: './db/database.sqlite',
});

module.exports = sequelize