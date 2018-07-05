const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const User = require('../users/models');
const UserBoardGame = require('../userBoardgames/models');

let BoardGame = sequelize.define("BoardGames", {
  "id": { type: Sequelize.INTEGER, primaryKey: true, field: 'game_id' },
  "description": { type: Sequelize.STRING, field: 'details_description' },
  "image": { type: Sequelize.STRING, field: 'details_image' },
  "maxplayers": { type: Sequelize.INTEGER, field: 'details_maxplayers' },
  "minplayers": { type: Sequelize.INTEGER, field: 'details_minplayers' },
  "name": { type: Sequelize.STRING, field: 'details_name' },
  "playingtime": { type: Sequelize.INTEGER, field: 'details_playingtime' },
  "rating": { type: Sequelize.INTEGER, field: 'stats_average' },
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
