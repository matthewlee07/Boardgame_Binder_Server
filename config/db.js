let Sequelize = require('sequelize');
console.log(process.env.DATABASE_URL);
let sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: true, //false
    quoteIdentifiers: true,

});

sequelize.sync();

module.exports = sequelize
