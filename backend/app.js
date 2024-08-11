const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jayson = require("jayson");
const app = express();

const CalculatorService = require("./services/calculator.js");
const calculator = new CalculatorService();
// enable cors for all routes
app.use(cors());

// create new jayson server
const server = jayson.server(calculator, undefined);

// Automatically parse request bodies
app.use(bodyParser.json());

// setup jayson middleware at specific endpoint
app.post("/calculator", server.middleware());

module.exports = function startServer(port) {
  // start the server
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  server.on("close", () => {
    console.log("Server closed");
  });

  return server;
};
