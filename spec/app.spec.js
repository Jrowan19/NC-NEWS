process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("chai-sorted");
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection.js");
chai.use(chaiSorted);

describe("/api", () => {
    beforeEach(() => connection.seed.run());
    after(() => connection.destroy());
    it("api router status 200 message", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then(({ body }) => {
                expect(body.msg).to.equal("you have reached the api router");
            });
    });
    describe('#GET TOPICS', () => {
        it('should return status 200 when all topics are sent back to client', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({ body }) => {
                    expect(body.topics).to.be.an('Array')
                    expect(body.topics[0]).to.be.an('Object')
                })
        })
        it('should return an array containing the slug and description properties', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({ body }) => {
                    //console.log(body)
                    expect(body.topics[0]).to.have.keys('slug', 'description')
                })
        })
        it('should return 404 Route Not Found, when provided with an invalid route', () => {
            return request(app)
                .get('/api/not-a-route')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).to.eql(body.msg)
                })
        })

        describe('#GET USERS', () => {
            it('should return status 200 and the requested username object', () => {
                return request(app)
                    .get('/api/owners/username')
                    .expect(200)
                    .then(({ body: { username } }) => {
                        expect(username).to.eql('icellusedkars')
                    })
            })
        })




    })

})

