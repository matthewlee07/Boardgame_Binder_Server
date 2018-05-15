const Sequelize = require('sequelize');
const sequelize = require('../config/db');

let UserBoardGame = sequelize.define("UserBoardGame", {
    "userID": { type: Sequelize.INTEGER },
    "boardGameID": { type: Sequelize.INTEGER },
    "image": { type: Sequelize.STRING, field: 'details_image' },
    "numplayers": { type: Sequelize.INTEGER, field: 'details_minplayers' },
    "minplayers": { type: Sequelize.INTEGER, field: 'details_minplayers' },
    "maxplayers": { type: Sequelize.INTEGER, field: 'details_maxplayers' },
    "playingtime": { type: Sequelize.INTEGER, field: 'details_playingtime' },
    "name": { type: Sequelize.STRING, field: 'details_name' },
    "rating": { type: Sequelize.INTEGER, field: 'stats_average' },
});

module.exports = UserBoardGame
