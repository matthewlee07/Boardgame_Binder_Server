const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const User = require('./models');
const jwtAuth = passport.authenticate('jwt', { session: false });
const router = express.Router();
let Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.use(jsonParser);

router.get('/', (req, res) => {
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
    const requiredFields = ["userName", "firstName", "lastName", "email", "password"]
    const missingField = requiredFields.find(field => !(field in req.body));
    if (missingField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }
    User.find({
        where: { [Op.or]: [{ userName: req.body.userName }, { email: req.body.email }] },
        attributes: [[Sequelize.fn('COUNT', Sequelize.col('userName')), 'count']]
    })
        .then(user => {
            if (user.get('count') > 0) {
                return Promise.reject({
                    code: 422,
                    reason: 'ValidationError',
                    message: 'Username or Email taken',
                    location: 'username'
                });
            }
            return User.hashPassword(req.body.password)
        })
        .then(hash => {
            return User.create({
                userName: req.body.userName,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
            })
        })
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.log(err);
            if (err.reason == 'ValidationError') {
                return res.status(err.code).json(err);
            }
            res.status(500).json({ code: 500, message: err });

        })
})

router.put('/:id', jsonParser, jwtAuth, (req, res) => {
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
