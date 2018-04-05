const express = require('express');
const router = express.Router();
const BoardGame = require('../boardgames/models');
const User = require('../users/models');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const UserBoardGame = require('./models');
router.get('/', jwtAuth, (req, res) => {
    User
        .find({
            where: { id: req.user.id },
            include: ["games"]
        })
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({ error: 'internal server error' });
        });
});

router.post('/', jwtAuth, jsonParser, (req, res) => {
    User
        .find({
            where: { id: req.user.id },
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
                                minrating: game.minrating,
                                maxrating: game.maxrating,
                            }
                        })
                            .then((user) => {
                                res.json(user);
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

router.put('/:id', jwtAuth, jsonParser, (req, res) => {
    UserBoardGame
        .update({
            minplayers: req.params.minplayers,
            maxplayers: req.params.maxplayers,
            playingtime: req.params.playingtime,
            rating: req.params.rating,
        },
            { where: { id: req.params.id } })
        .then(updatedUser => {
            res.json(updatedUser);
        })
        .catch(err => {
            console.log(err)
        })
})

router.delete('/:id', jwtAuth, (req, res) => {
    UserBoardGame
        .destroy({
            where: { boardgameID: req.params.id }
        })
        .then(deleted => {
            res.json(deleted)
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router;
