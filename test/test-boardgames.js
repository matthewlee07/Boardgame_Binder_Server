const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../server');


chai.use(chaiHttp);

describe('/boardgames', () => {
    before(() => {
        return runServer();
    });

    after(() => {
        return closeServer();
    })

    describe('GET', function () {
        const sample_boardgame = {
            id: 1,
            description: "Die Macher is a game about seven sequential political races in different regions of Germany. Players are in charge of national political parties, and must manage limited resources to help their party to victory. The winning party will have the most victory points after all the regional elections. There are four different ways of scoring victory points. First, each regional election can supply one to eighty victory points, depending on the size of the region and how well your party does in it. Second, if a party wins a regional election and has some media influence in the region, then the party will receive some media-control victory points. Third, each party has a national party membership which will grow as the game progresses and this will supply a fair number of victory points. Lastly, parties score some victory points if their party platform matches the national opinions at the end of the game.&#10;&#10;The 1986 edition featured 4 parties from the old West Germany and supported 3-4 players. The 1997 edition supports up to 5 players in the re-united Germany and updated several features of the rules as well. The 2006 edition also supports up to 5 players and adds a shorter 5 round variant and additional rules updates by the original designer.&#10;&#10;Die Macher is #1 in the Valley Games Classic Line&#10;&#10;",
            image: "//cf.geekdo-images.com/images/pic159509.jpg",
            maxplayers: 5,
            minplayers: 3,
            name: "Die Macher",
            playingtime: 240,
            rating: 8
        }

        describe('GET', function () {

            it('Should return all existing boardgames', function () {
                return chai
                    .request(app)
                    .get('/boardgames')
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        expect(res.body.length).to.be.above(0);
                        expect(res.body).to.be.an('array');
                        res.body.forEach(function (boardgame) {
                            expect(boardgame).to.be.an('object');
                            expect(boardgame).to.include.keys(
                                'id', 'description', 'image', 'maxplayers', 'minplayers', 'name', 'playingtime', 'rating');
                        });
                        expect(res).to.be.json;
                    })
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }
                    });
            });

            it('Should return boardgame ID = 1', function () {
                return chai
                    .request(app)
                    .get('/boardgames/1')
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        expect(res).to.be.an('object');
                        expect(res.body).to.include.keys(
                            'id', 'description', 'image', 'maxplayers', 'minplayers', 'name', 'playingtime', 'rating');
                        expect(res.body.description).to.deep.equal(sample_boardgame.description);
                        expect(res.body.name).to.deep.equal(sample_boardgame.name);
                        expect(res.body.minPlayers).to.deep.equal(sample_boardgame.minPlayers);
                        expect(res.body.maxPlayers).to.deep.equal(sample_boardgame.maxPlayers);
                        expect(res.body.avgTime).to.deep.equal(sample_boardgame.avgTime);
                        expect(res.body.rating).to.deep.equal(sample_boardgame.rating);
                        expect(res.body.imgUrl).to.deep.equal(sample_boardgame.imgUrl);
                    });
            });
        });
    })
});