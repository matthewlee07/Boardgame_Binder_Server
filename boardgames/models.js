const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const User = require('../users/models');
const UserBoardGame = require('../userBoardgames/models');

let BoardGame = sequelize.define("BoardGames", {
  "id": { type: Sequelize.INTEGER, primaryKey: true, field: '[game.id]' },
  "description": { type: Sequelize.STRING, field: 'details.description' },
  "image": { type: Sequelize.STRING, field: 'details.image' },
  "minplayers": { type: Sequelize.INTEGER, field: 'details.minplayers' },
  "maxplayers": { type: Sequelize.INTEGER, field: 'details.maxplayers' },
  "playingtime": { type: Sequelize.INTEGER, field: 'details.playingtime' },
  "name": { type: Sequelize.STRING, field: 'details.name' },
  "rating": { type: Sequelize.INTEGER, field: 'stats.average' },
}, {
    timestamps: false
  });

BoardGame.belongsToMany(User, {
  through: UserBoardGame,
  as: 'members',
  foreignKey: 'boardGameID'
});

User.belongsToMany(BoardGame, {
  through: UserBoardGame,
  as: 'games',
  foreignKey: 'userID'
});

module.exports = BoardGame;
