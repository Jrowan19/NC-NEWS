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



});