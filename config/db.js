let Sequelize = require('sequelize');

let sequelize = new Sequelize('mainDB', null, null, {
    dialect: "sqlite",
    storage: './db/database.sqlite',
});

sequelize.sync();

module.exports = sequelize
