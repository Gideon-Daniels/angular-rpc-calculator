const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");

const startServer = require("../app");

describe("Calculator", () => {
  let body;
  let server;

  before(() => {
    server = startServer(2000);
  });

  beforeEach(() => {
    body = {
      jsonrpc: "2.0",
      method: "calculate",
      params: "",
      id: 1,
    };
  });

  after(() => {
    server.close();
  });

  it("should return the correct result", async () => {
    body.params = ["1+2*2/2+2-1"];

    const response = await request(server)
      .post("/")
      .send(body)
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).match(/json/);
    expect(response.body).to.eql({
      jsonrpc: "2.0",
      id: 1,
      result: "4",
    });
    expect(response.status).to.equal(200);
  });
});
