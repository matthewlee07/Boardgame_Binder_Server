const express = require('express');
const router = express.Router();
const BoardGame = require('../boardgames/models');
const User = require('../users/models');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res) => {
    User
        .find({
            where: { id: req.body.userID }
        })
        .then(user => {
            BoardGame
                .find({
                    where: { id: req.body.boardgameID }
                })
                .then(game => {
                    user.setBoardGames([game]).then(() => {
                        res.json(game);
                        console.log('userboardgame success');
                    })
                })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router;