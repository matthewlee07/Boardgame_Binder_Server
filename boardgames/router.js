const express = require('express');
const router = express.Router();
const BoardGame = require('./models');

router.get('/', (req, res) => {
    //req.query are native to Express
    let page = req.query.page || 0;
    let pageSize = req.query.pageSize || 10;
    BoardGame
        .findAll({
            limit: pageSize,
            offset: page * pageSize
        }).then(games => {
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