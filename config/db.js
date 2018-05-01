let Sequelize = require('sequelize');

let sequelize = new Sequelize('mainDB', null, null, {
    dialect: "postgres",
    host:'lksgvhqwhstssm:c3c9f162b9f1be29b20faf419f06abbe722cc379b21f8781d01c0be58014648b@ec2-54-204-46-236.compute-1.amazonaws.com'
});

sequelize.sync();

module.exports = sequelize
