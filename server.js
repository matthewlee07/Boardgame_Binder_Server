require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { PORT } = require('./config');
const passport = require('passport');
const BoardGame = require('./config/db');
const BoardGameRouter = require('./boardgames/router');
const UserRouter = require('./users/router');
const UserBoardGameRouter = require('./userBoardgames/router');
const app = express();
const AuthRouter = require('./auth/router');
const { localStrategy, jwtStrategy } = require('./auth/strategies');
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(morgan('common', { skip: () => process.env.NODE_ENV === 'test' }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/boardgames', BoardGameRouter);
app.use('/users', UserRouter);
app.use('/userboardgames', UserBoardGameRouter);
app.use('/auth', AuthRouter);
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Not Found' });
})

let server;
function runServer() {
    return new Promise((resolve, reject) => {
        server = app
            .listen(PORT, () => {
                console.log(`Your app is listening on port ${PORT}`);
            })
            .on('error', err => {
                reject(err);
            });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };