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

    const sample_user = {
        userName: "userName",
        firstName: "firstName",
        lastName: "lastName",
        email: "email@email.com",
        password: "password123"
    }

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
                    expect(res.body.userName).to.deep.equal(sample_user.userName);
                    expect(res.body.firstName).to.deep.equal(sample_user.firstName);
                    expect(res.body.lastName).to.deep.equal(sample_user.lastName);
                    expect(res.body.email).to.deep.equal(sample_user.email);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                });;
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
                    expect(res.body.userName).to.deep.equal(sample_user.userName);
                    expect(res.body.firstName).to.deep.equal(sample_user.firstName);
                    expect(res.body.lastName).to.deep.equal(sample_user.lastName);
                    expect(res.body.email).to.deep.equal(sample_user.email);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                });;
        });
    })
});