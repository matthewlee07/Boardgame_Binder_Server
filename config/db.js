const Sequelize = require('sequelize');
const sequelize = new Sequelize('boardgames','matthewlee', 'Freecoding18',{
    dialect: "postgres",
});

sequelize.sync();
module.exports = sequelize