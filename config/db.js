let Sequelize = require('sequelize');

let sequelize = new Sequelize('mainDB', null, null, {
    dialect: "postgres",
});

sequelize.sync();

module.exports = sequelize
