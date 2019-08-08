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
        it('ERROR - status 405 "method not allowed" message when trying to post, patch or delete topics', () => {
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

    describe('#GET USERS /:username', () => {
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
        it('ERROR - status 405 "method not allowed" message when trying to post, patch or delete users', () => {
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
    describe('#GET ARTICLES/:article_id', () => {
        it("returns a 200 status and article data when passed a valid artcile_id", () => {
            return request(app)
                .get("/api/articles/3")
                .expect(200)
                .then(({ body }) => {
                    expect(body.article).to.be.an('Object')
                    expect(body.article).to.have.all.keys(
                        "author",
                        "title",
                        "article_id",
                        "body",
                        "topic",
                        "created_at",
                        "votes",
                        "comment_count"
                    )
                    expect(body.article.article_id).to.equal(3)
                });
        });
        it("returns status 200 when passed a valid article_id with no comments", () => {
            return request(app)
                .get("/api/articles/2")
                .expect(200)
                .then(({ body }) => {
                    expect(+body.article.comment_count).to.equal(0);
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
    describe("#PATCH /article_id", () => {
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
        it('returns a status 200 when sent an empty request body and the votes unaltered', () => {
            return request(app)
                .patch("/api/articles/1")
                .send({})
                .expect(200)
                .then(({ body }) => {
                    expect(body.article.votes).to.equal(100);
                });
        });
        it('ERROR - should return status 400 when trying to increment the vote using a string value', () => {
            return request(app)
                .patch('/api/articles/one')
                .send({ inc_votes: 1 })
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).to.equal(body.msg)
                })
        })
        it('ERROR - returns status 400 when sent a patch with an invalid inc_votes value', () => {
            return request(app)
                .patch("/api/articles/1")
                .send({ inc_votes: "one" })
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).to.equal(body.msg);
                });
        });
    }) // *** add more tests *** 
    describe('#POST /:article_id/comments', () => {
        it('returns status 201 and checks the keys and posted comment', () => {
            return request(app)
                .post('/api/articles/3/comments')
                .send({
                    username: 'butter_bridge',
                    body: 'I find this existence challenging'
                })
                .expect(201)
                .then(({ body }) => {
                    expect(body.comment.body).to.equal('I find this existence challenging')
                    expect(body.comment.article_id).to.eql(3)
                    expect(body.comment).to.have.keys(
                        'comment_id',
                        'author',
                        'article_id',
                        'votes',
                        'created_at',
                        'body')
                    expect(body.comment.author).to.eql('butter_bridge')
                })
        })
        it('ERROR - status 400 when posted a comment to a user who doesnt exist', () => {
            return request(app)
                .post('/api/articles/1/comments')
                .send({
                    username: 'jrowan',
                    body: 'LIVERPOOL FC CHAMPIONS LEAGEUE WINNER 2019'
                })
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).to.equal(body.msg);
                })
        });
        it('ERROR - returns status 400 when the article_id is passed in the wrong format ', () => {
            return request(app)
                .post('/api/articles/three/comments')
                .send({
                    username: 'butter_bridge',
                    body: 'I find this existence challenging'
                })
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).to.eql(body.msg)
                })
        })
        it('ERROR- 404 when posted a comment using a non existant article_id', () => {
            return request(app)
                .post('/api/articles/12345/comments')
                .send({
                    username: 'butter_bridge',
                    body: 'this is tough'
                })
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).to.equal(body.msg);
                })
        });
        it('ERROR- status 400 when posting a comment with no body', () => {
            return request(app)
                .post('/api/articles/1/comments')
                .send({
                    username: 'butter_bridge'
                })
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).to.equal(body.msg);
                })
        });
    });
    it('ERROR - status 405 and "Method Not Allowed" when attempting to patch, put or delete comments', () => {
        const invalidMethods = ["patch", "put", "delete"];
        const methodPromises = invalidMethods.map(method => {
            return request(app)
            [method]("/api/articles/1/comments")
                .expect(405)
                .then(({ body }) => {
                    expect(body.msg).to.equal(body.msg);
                });
        });
        return Promise.all(methodPromises);
    });


    describe('#GET /:article_id/comments', () => {
        it('returns status 200 and an array for given article id', () => {
            return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(({ body }) => {
                    expect(body.comments).to.be.an('array')
                    expect(body.comments[0]).to.be.an('object')
                    expect(body.comments[0]).to.have.keys("article_id", "author", "body", "comment_id", "created_at",
                        "votes")
                })
        });
        it('returns status 200 and sorts the comments in descending order and by the default of created_at even when no query is passed', () => {
            return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(({ body }) => {
                    expect(body.comments).to.be.sortedBy("created_at", { descending: true });
                })
        })
        it('returns status 200 and sorts the comments in descending order and by the default of created_at with the query included', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=created_at')
                .expect(200)
                .then(({ body }) => {
                    expect(body.comments).to.be.sortedBy("created_at", { descending: true });
                })
        })

        it('returns status 200 and sorts the comments in descending order and by the votes when a sort_by query is included only', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=votes')
                .expect(200)
                .then(({ body }) => {
                    expect(body.comments).to.be.sortedBy("votes", { descending: true });
                })
        })
        it('returns status 200 and sorts the comments in ascending order and by the votes when both a sort_by and order query are included', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=votes&order=asc')
                .expect(200)
                .then(({ body }) => {
                    expect(body.comments).to.be.sortedBy("votes", { ascending: true });
                })
        })
        it('ERROR - returns status 400 when passed an invalid sort_by value', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=mrrowan')
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).to.eql(body.msg)
                })
        })
        it('ERROR - returns status 404 when passed an invalid user_id to', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=mrrowan')
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).to.eql(body.msg)
                })
        })
    })
    describe('', () => {
        it('', () => {
            
        })
    })



})
