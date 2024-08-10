const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jayson = require("jayson");

const app = express();

// enable cors for all routes
app.use(cors());

// create new jayson server
const server = jayson.server({
  add: function (args, callback) {
    callback(null, args[0] + args[1]);
  },
});

// Automatically parse request bodies
app.use(bodyParser.json());

// setup jayson middleware
app.use(server.middleware());

const port = 3000;

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
