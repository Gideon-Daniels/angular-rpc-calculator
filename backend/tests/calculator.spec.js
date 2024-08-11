const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");

const startServer = require("../app");

describe("Calculator", () => {
  let req;
  let body;
  let server;

  before(() => {
    server = startServer(2000);
  });

  beforeEach(() => {
    body = {
      jsonrpc: "2.0",
      method: "calculate",
      params: [],
      id: 1,
    };
    req = request(server).post("/calculator");
  });

  after(() => {
    server.close();
  });

  context("adding", () => {
    it("should add two numbers", () => {
      body.params = [1, "+", 2];

      req
        .send(body)
        .set("Accept", "application/json")
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.eql({ jsonrpc: "2.0", id: 1, result: 3 });
        });
    });

    it("should add more then two numbers", () => {
      body.params = [1, "+", 2, "+", 3, "+", 4, "+", 5];

      req
        .send(body)
        .set("Accept", "application/json")
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.eql({ jsonrpc: "2.0", id: 1, result: 15 });
        });
    });
  });

  context("subtracting", () => {
    it("should subtract two numbers", () => {
      body.params = [2, "-", 1];

      req
        .send(body)
        .set("Accept", "application/json")
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.eql({ jsonrpc: "2.0", id: 1, result: 1 });
        });
    });

    it("should subtract with negative numbers", () => {
      body.params = [1, "-", 3];

      req
        .send(body)
        .set("Accept", "application/json")
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.eql({ jsonrpc: "2.0", id: 1, result: -2 });
        });
    });

    it("should subtract with more then one negative number", () => {
      body.params = [1, "-", 2, "-", 3, "-", 4];

      req
        .send(body)
        .set("Accept", "application/json")
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.eql({ jsonrpc: "2.0", id: 1, result: -8 });
        });
    });

    it("should subtract more then two numbers", () => {
      body.params = [10, "-", 5, "-", 4, "-", 1];

      req
        .send(body)
        .set("Accept", "application/json")
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.eql({ jsonrpc: "2.0", id: 1, result: 0 });
        });
    });
  });

  context("divide", function () {
    it("should divide two numbers", () => {
      body.params = [1, "/", 2];

      req
        .send(body)
        .set("Accept", "application/json")
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.eql({ jsonrpc: "2.0", id: 1, result: 0.5 });
        });
    });

    it("should divide more then two numbers", () => {
      body.params = [10, "/", 5, "/", 2, "/", 1];

      req
        .send(body)
        .set("Accept", "application/json")
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.eql({ jsonrpc: "2.0", id: 1, result: 1 });
        });
    });
  });

  context("multiply", () => {
    it("should multiply two numbers", () => {
      body.params = [1, "*", 2];

      req
        .send(body)
        .set("Accept", "application/json")
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.eql({ jsonrpc: "2.0", id: 1, result: 2 });
        });
    });

    it("should multiply more then two numbers", () => {
      body.params = [10, "*", 5, "*", 2, "*", 1];

      req
        .send(body)
        .set("Accept", "application/json")
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.eql({ jsonrpc: "2.0", id: 1, result: 100 });
        });
    });
  });
});
