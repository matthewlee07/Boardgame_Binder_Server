let Sequelize = require('sequelize');
let sequelize = new Sequelize({
    username: 'matthewlee',
    password: 'Freecoding18',
    dialect: "postgres",
    storage: './db/BoardGames.sql',
});

sequelize.sync();

module.exports = sequelize
