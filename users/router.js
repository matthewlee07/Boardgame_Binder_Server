const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./models');
const BoardGame = require('../boardgames/models');
const config = require('../config');
const basicAuth = passport.authenticate('basic', { session: false });
const jwtAuth = passport.authenticate('jwt', { session: false });
const router = express.Router();
router.use(jsonParser);

router.get('/', jwtAuth, (req, res) => {
    User
        .findAll({})
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Search failed' });
        });
});

router.get('/:id', (req, res) => {
    User
        .find({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({ error: 'internal server error' });
        })
});

router.post('/', jsonParser, (req, res) => {
    // removed "dob" from required fields
    const requiredFields = ["username", "firstName", "lastName", "email", "password"]
    const missingField = requiredFields.find(field => !(field in req.body));
    if (missingField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }
    User.hashPassword(req.body.password).then(hash => {
        User.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            // dob: req.body.dob
        })
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                res.status(500).json({ code: 500, message: err });
            })
    })
})

router.put('/:id', jsonParser, jwtAuth, (req, res) => {
    // const updates = req.body.updates;
    User
        .find({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            return user.updateAttributes(req.body)
        })
        .then(updatedUser => {
            res.json(updatedUser);
        })
        .catch(err => {
            console.log(err)
        })
})

router.delete('/:id', (req, res) => {
    User
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then(deletedUser => {
            res.json(deletedUser);
        })
        .catch(err => {
            res.status(500).json({ error: 'internal server error' });
        })
})

module.exports = router;