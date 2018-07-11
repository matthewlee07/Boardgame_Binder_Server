require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const BoardGame = require('./config/db');

const BoardGameRouter = require('./boardgames/router');
const UserRouter = require('./users/router');
const UserBoardGameRouter = require('./userBoardgames/router');
const AuthRouter = require('./auth/router');
const { localStrategy, jwtStrategy } = require('./auth/strategies');
const { PORT } = require('./config');
// *const jwtAuth = passport.authenticate('jwt', { session: false });

const app = express();

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(morgan('common', { skip: () => process.env.NODE_ENV === 'test' }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/boardgames', BoardGameRouter);
app.use('/users', UserRouter);
app.use('/userboardgames', UserBoardGameRouter);
app.use('/auth', AuthRouter);
// *app.get('/api/protected', jwtAuth, (req, res) => {
//     return res.json({ data: 'rosebud' });
// });

app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Not Found' });
})

let server;
function runServer() {
    return new Promise((resolve, reject) => {
        server = app
            .listen(PORT, () => {
                console.log(`Your app is listening on port ${PORT}`);
                resolve();
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