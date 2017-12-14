require('dotenv').config();
const express = require('express');
const cors = require('cors');
//Morgan is used for logging request details
const morgan = require('morgan');
//Node tool
const path = require('path');
const {PORT} = require('./config');
const passport = require('passport');

const app = express();
app.use(morgan('common', { skip: () => process.env.NODE_ENV === 'test' }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

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