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
                    expect(body.topics[0]).to.have.keys('slug', 'description')
                })
        })
        it('ERROR - should return 404 Route Not Found, when provided with an invalid route', () => {
            return request(app)
                .get('/not-a-route')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).to.eql(body.msg)
                })
        })
        it('ERROR - gives a 405 "method not allowed" message when trying to post, patch or delete topics', () => {
            const invalidMethods = ["patch", "put", "delete"];
            const methodPromises = invalidMethods.map(method => {
                return request(app)
                [method]("/api/topics")
                    .expect(405)
                    .then(({ body }) => {
                        expect(body.msg).to.equal(body.msg);
                    });
            });
            return Promise.all(methodPromises);
        });
    });

    describe('#GET USERS', () => {
        it("should return a user object", () => {
            return request(app)
                .get("/api/users/butter_bridge")
                .expect(200)
                .then(({ body }) => {
                    expect(body.user).to.be.an("object");
                    expect(body.user).to.have.all.keys("username", "avatar_url", "name");
                });
        });
        it('ERROR - should return 404 when a non existant username is passed', () => {
            return request(app)
                .get("/api/users/not-a-name")
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).to.equal(body.msg);
                });
        });
        it('ERROR - should return 404 when a non existant user is provided', () => {
            return request(app)
                .get("/api/users/5")
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).to.equal(body.msg);
                });
        });
        it('ERROR - gives a 405 "method not allowed" message when trying to post, patch or delete users', () => {
            const invalidMethods = ["patch", "put", "delete"];
            const methodPromises = invalidMethods.map(method => {
                return request(app)
                [method]("/api/topics")
                    .expect(405)
                    .then(({ body }) => {
                        expect(body.msg).to.equal(body.msg);
                    });
            });
            return Promise.all(methodPromises);
        });
    })
    describe('#GET ARTICLES', () => {
        it("returns a 200 status and article data when passed a valid artcile_id", () => {
            return request(app)
                .get("/api/articles/3")
                .expect(200)
                .then(({ body }) => {
                    //console.log(body)
                    expect(body.article).to.be.an('Object')
                    expect(body.article).to.have.keys(
                        "author",
                        "title",
                        "article_id",
                        "body",
                        "topic",
                        "created_at",
                        "votes",
                        "comment_count"
                    )
                });
        });
        it('ERROR - returns 404 when passed a non existant article_id', () => {
            return request(app)
                .get('/api/articles/12345')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).to.equal(body.msg)
                })
        })
        it('ERROR - returns status 400 when passed the id is passed in the wrong format, such as a string', () => {
            return request(app)
                .get('/api/articles/this-is-a-string')
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).to.equal(body.msg)
                })
        })
    });
    describe("PATCH /article_id", () => {
        it('returns status 200 when successfully increasing the votes by 1', () => {
            return request(app)
                .patch("/api/articles/1")
                .send({ inc_votes: 1 })
                .expect(200)
                .then(({ body }) => {
                    expect(body.article.votes).to.equal(101);
                })
        })
        it('returns status 200 when successfully decrements the votes by 99', () => {
            return request(app)
                .patch("/api/articles/1")
                .send({ inc_votes: -99 })
                .expect(200)
                .then(({ body }) => {
                    expect(body.article.votes).to.equal(1);
                })
        })
        it('ERROR - should return status 400 when trying to increment the vote using a string value', () => {
            return request(app)
                .patch('/api/articles/one')
                .send({ inc_votes: 1 })
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).to.equal(body.msg)
                })
        })

    })

})
