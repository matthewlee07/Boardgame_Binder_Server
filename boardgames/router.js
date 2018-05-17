const express = require('express');
const router = express.Router();
const BoardGame = require('./models');
const UserBoardGame = require('../userBoardgames/models');
let Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
    let page = req.query.page || 0;
    let pageSize = req.query.pageSize || 10;
    // Sequelize.query[`select game_id as id, details_description as description, details_image as image,
    //     details_minplayers as minplayers, details_maxplayers as maxplayers, details_playingtime as playingtime,
    //     details_name as name, stats_average as rating from "BoardGames" where details_name like :name and
    //     details_minplayers > :minplayers and details_maxplayers < :maxplayers and details_playingtime between :minplayingtime
    //     and :maxplayingtime and stats_average between :minrating and :maxrating limit :limit`, {
    //         replacements: {
    //             name: "%" + (req.query.name || "game") + "%",
    //             minplayers: req.query.minplayers || 1,
    //             maxplayers: req.query.maxplayers || 20,
    //             minplayingtime: req.query.minplayingtime || 0,
    //             maxplayingtime: req.query.maxplayingtime || 1000,
    //             minrating: req.query.minrating || 0,
    //             maxrating: req.query.maxrating || 10,
    //             limit: pageSize
    //         },
    //         model: BoardGame
    //     }]
    BoardGame
        .findAll({
            limit: pageSize,
            offset: page * pageSize,
            where: {
                name: {
                    [Op.iLike]: "%" + (req.query.name || "game") + "%"
                },
                minplayers: {
                    [Op.gte]: req.query.minplayers || 1
                },
                maxplayers: {
                    [Op.lte]: req.query.maxplayers || 20
                },
                playingtime: {
                    [Op.between]: [req.query.minplayingtime || 0, req.query.maxplayingtime || 1000]
                },
                rating: {
                    [Op.between]: [req.query.minrating || 0, req.query.maxrating || 10]
                }
            }})
        .then(games => {
            res.json(games);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Search failed' });
        });
});

router.get('/:id', (req, res) => {
    BoardGame
        .find({
            where: {
                id: req.params.id
            }
        })
        .then(game => {
            res.json(game);
        })
        .catch(err => {
            res.status(500).json({ error: 'internal server error' });
        });
});

module.exports = router;
