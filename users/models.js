const sequelize = require('../config/db');
const Sequelize = require('sequelize');
// const bcrypt = require('bcryptjs');

let User = sequelize.define("Users", {
    "userName": { type: Sequelize.STRING, required: true, unique: true },
    "firstName": { type: Sequelize.STRING, required: true },
    "lastName": { type: Sequelize.STRING, required: true },
    "email": { type: Sequelize.STRING, required: true, unique: true, validate: { isEmail: { args: true, msg: "invalid email" } } },
    "password": { type: Sequelize.STRING, required: true },
    "dob": { type: Sequelize.DATEONLY, required: true },
}, { indexes: [] })

//sequelize redefines User table
User.sync();

module.exports = User