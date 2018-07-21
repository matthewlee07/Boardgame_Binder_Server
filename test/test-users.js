const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../server');
chai.use(chaiHttp);

describe('/users', () => {
    before(() => {
        return runServer();
    });

    after(() => {
        return closeServer();
        console.log('closing server')
    })

    const userName = "1userName";
    const firstName = "firstName";
    const lastName = "lastName";
    const email = "1email@email.com";
    const password = "password123"

    describe('POST', () => {
        it('Should reject users with missing userName', () => {
            return chai
                .request(app)
                .post('/users')
                .send({ firstName, lastName, email, password })
                .then(res => {
                    expect(res).to.be.json;
                    expect(res).to.have.status(422);
                    expect(res.body.reason).to.equal('ValidationError');
                    expect(res.body.message).to.equal('Missing field');
                    expect(res.body.location).to.equal('userName');
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                });
        });

        it('Should reject users with missing password', function () {
            return chai
                .request(app)
                .post('/users')
                .send({ userName, firstName, lastName, email })
                .then(res => {
                    expect(res).to.be.json;
                    expect(res).to.have.status(422);
                    expect(res.body.reason).to.equal('ValidationError');
                    expect(res.body.message).to.equal('Missing field');
                    expect(res.body.location).to.equal('password');
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                });
        });
    })

    describe('GET', () => {
        it('Should return all existing users', () => {
            return chai
                .request(app)
                .get('/users')
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.be.above(0);
                    expect(res.body).to.be.an('array');
                    res.body.forEach(user => {
                        expect(user).to.be.an('object');
                        expect(user).to.include.keys(
                            'userName', 'firstName', 'lastName', 'email');
                    });
                    expect(res).to.be.json;
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                });
        })
        it('Should return user ID = 1', () => {
            return chai
                .request(app)
                .get('/users/1')
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.include.keys(
                        'userName', 'firstName', 'lastName', 'email');
                    expect(res.body.userName).to.deep.equal(userName);
                    expect(res.body.firstName).to.deep.equal(firstName);
                    expect(res.body.lastName).to.deep.equal(lastName);
                    expect(res.body.email).to.deep.equal(email);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                });;
        });
    })
});