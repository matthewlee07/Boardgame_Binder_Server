const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const BoardGame = require('../boardgames/models');
const User = require('../users/models');

let UserBoardGame = sequelize.define("UserBoardGame", {
    "id": { type: Sequelize.INTEGER, primaryKey: true, field: 'UserBoardGame.id' },
    "userID": { type: Sequelize.INTEGER },
    "boardGameID": { type: Sequelize.INTEGER },
    "description": { type: Sequelize.STRING, field: 'details.description' },
    "image": { type: Sequelize.STRING, field: 'details.image' },
    "minplayers": { type: Sequelize.INTEGER, field: 'details.minplayers' },
    "maxplayers": { type: Sequelize.INTEGER, field: 'details.maxplayers' },
    "playingtime": { type: Sequelize.INTEGER, field: 'details.playingtime' },
    "name": { type: Sequelize.STRING, field: 'details.name' },
    "rating": { type: Sequelize.INTEGER, field: 'stats.average' },
});

//UserBoardGame.sync();
module.exports = UserBoardGame
