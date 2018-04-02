const express = require('express');
const router = express.Router();
const BoardGame = require('../boardgames/models');
const User = require('../users/models');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

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
// what is jsonParser doing here?
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

// router.put('/', jwtAuth, jsonParser, (req, res) => {
//     User
//         .find({
//             where: { id: req.user.id },
//             include: ["games"]
//         })
//         .then()
//         .catch(err => {
//             console.log(err)
//         })
// })

// router.delete('/', jwtAuth, (req, res) => {
//     User
//         .find({
//             where: { id: req.user.id },
//             include: ["games"]
//         })
//         .then(user => {

//         })
//         .catch(err => {
//             console.log(err)
//         })
// })

module.exports = router;
