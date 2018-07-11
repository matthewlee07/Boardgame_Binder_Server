const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../server');
let Sequelize = require('sequelize');
chai.use(chaiHttp);

describe('/users', () => {
    before(() => {
        Users.sync({ force: true })
        return runServer();
    });
    console.log('testing users')
    after(() => {
        return closeServer();
        console.log('closing server')
    })
});