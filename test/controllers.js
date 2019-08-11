let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("Last 25 stories", function() {
  it("it should GET the top words in the last 25 stories", function(done) {
    chai
      .request(server)
      .get("/last-25-stories")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.not.eql(0);
        done();
      });
  });
});

describe("Last week", function() {
  it("it should GET the top words in the last week", function(done) {
    chai
      .request(server)
      .get("/last-week")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.not.eql(0);
        done();
      });
  });
});

describe("Users with 10000 Karma", function() {
  it("it should GET the top words for users with karma more than 10000", function(done) {
    chai
      .request(server)
      .get("/users-with-10000-karma")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.not.eql(0);
        done();
      });
  });
});
