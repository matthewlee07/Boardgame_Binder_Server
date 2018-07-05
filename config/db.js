let Sequelize = require('sequelize');
let sequelize = new Sequelize({
    username: 'matthewlee',
    password: 'Freecoding18',
    database: 'boardgames',
    dialect: "postgres",
    storage: './db/BoardGames.sql',
    // operatorsAliases: false
});

sequelize.sync();
// sequelize.sync({force: true})
module.exports = sequelize
