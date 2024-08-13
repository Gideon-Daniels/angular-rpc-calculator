import chai from "chai";
import request from "supertest";
import {Server} from "http";
import {startServer} from "../app";

const expect = chai.expect;

describe("Calculator", () => {
    let body: { jsonrpc: string; method: string; params: string | string[]; id: number };
    let server: Server;

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

        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.match(/json/);
        expect(response.body).to.eql({
            jsonrpc: "2.0",
            id: 1,
            result: "4",
        });
    });
});
