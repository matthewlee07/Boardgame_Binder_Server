const bcrypt = require('bcryptjs');
const sequelize = require('../config/db');
const Sequelize = require('sequelize');

let User = sequelize.define("Members", {
    "userName": { type: Sequelize.STRING, required: true, unique: true },
    "firstName": { type: Sequelize.STRING, required: true },
    "lastName": { type: Sequelize.STRING, required: true },
    "email": { type: Sequelize.STRING, required: true, unique: true, validate: { isEmail: { args: true, msg: "invalid email" } } },
    "password": { type: Sequelize.STRING, required: true },
}, { indexes: [] })

User.apiRepr = function () {
    return {
        userName: this.userName || '',
        firstName: this.firstName || '',
        lastName: this.lastName || '',
    };
};

User.validatePassword = function (password, userpassword) {
    return bcrypt.compare(password, userpassword);
};

User.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
}

module.exports = User;
