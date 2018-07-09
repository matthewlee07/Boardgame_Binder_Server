let Sequelize = require('sequelize');
let sequelize = new Sequelize({
    // how to refer to .env file to hide username password
    username: 'matthewlee',
    password: 'Freecoding18',
    database: 'boardgames',
    dialect: "postgres",
});

sequelize.sync();
module.exports = sequelize
