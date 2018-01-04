const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// const jwt = require('jsonwebtoken');
// const passport = require('passport');
// const jwtAuth = passport.authenticate('jwt', { session: false });
// const basicAuth = passport.authenticate('basic', { session: false });

const User = require('./models');

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
    const requiredFields = ["userName", "firstName", "lastName", "email", "password", "dob"]
    // const missingField = requiredFields.find(field => !(field in req.body));
    User.create({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob
    })
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({ code: 500, message: err.message });
        })
})

router.put('/:id', jsonParser, (req, res) => {
    console.log('put req: ' + req.body)
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