let Sequelize = require('sequelize');

let sequelize = new Sequelize(process.env.DATABASE_URL, null, null, {
    dialect: "postgres",
});

sequelize.sync();

module.exports = sequelize
