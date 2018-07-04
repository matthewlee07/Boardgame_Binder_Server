let Sequelize = require('sequelize');
let sequelize = new Sequelize('mainDB', null, null, {
    dialect: "postgres",
    storage: './db/BoardGames.sql',
});

sequelize.sync();

module.exports = sequelize
