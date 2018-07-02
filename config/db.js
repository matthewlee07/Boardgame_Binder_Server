let Sequelize = require('sequelize');

let sequelize = new Sequelize('mainDB', null, null, {
    dialect: "sqlite",
    storage: './db/database.sqlite',
});

// let sequelize = new Sequelize(process.env.DATABASE_URL, {
//     logging: true,
//     quoteIdentifiers: true,
// });

sequelize.sync();

module.exports = sequelize
