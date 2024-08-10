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

// setup jayson middleware
app.use(server.middleware());

const port = 3000;

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
