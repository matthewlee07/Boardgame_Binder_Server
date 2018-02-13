const express = require('express');
const router = express.Router();
const BoardGame = require('../boardgames/models');
const User = require('../users/models');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/:id', (req, res) => {
    User
        .find({
            where: { id: req.params.id },
            include: ["games"]
        })
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({ error: 'internal server error' });
        });
});

router.post('/', jsonParser, (req, res) => {
    User
        .find({
            where: { id: req.body.userID },
            include: ["games"]
        })
        .then(user => {
            let foundGame = user.games.find(game => {
                return game.id === req.body.boardgameID
            })
            if (!foundGame) {
                BoardGame
                    .find({
                        where: { id: req.body.boardgameID }
                    })
                    .then(game => {
                        user.addGames(game, {
                            through: {
                                description: game.description,
                                image: game.image,
                                minplayers: game.minplayers,
                                maxplayers: game.maxplayers,
                                //
                                minrating: game.minrating,
                                maxrating: game.maxrating,
                            }
                        })
                            .then((user) => {
                                res.json(user);
                                console.log('userboardgame success');
                            })
                    })
            }
            else {
                res.json({ error: 'game already exists' })
            }
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router;
