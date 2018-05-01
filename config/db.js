let Sequelize = require('sequelize');
console.log(process.env.DATABASE_URL);
let sequelize = new Sequelize(process.env.DATABASE_URL, {
    // dialect: 'postgres',
    // protocol: 'postgres',
    // port: match[4],
    // host: match[3],
    logging: true //false

});

sequelize.sync();

module.exports = sequelize
