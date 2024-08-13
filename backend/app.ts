//todo: handle errors

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jayson from "jayson/promise";

import { CalculatorService } from "./services/calculator";

const app = express();

// create new jayson server
const server = new jayson.Server(
  {
    calculate: new CalculatorService().calculate,
  },
  undefined,
);

// Automatically parse request bodies
app.use(bodyParser.json());
// enable cors for all routes
app.use(cors());

// setup jayson middleware at specific endpoint
app.post("/", server.middleware());
// app.use((req, res, next) => {
//   const request = req.body;
//   server.call(request, (err, response) => {
//     if (err) {
//       // if err is an Error, err is NOT a json-rpc error
//       if (err instanceof Error) return next(err);
//       // <- deal with json-rpc errors here, typically caused by the user
//       res.status(400);
//       return res.send(err);
//     }
//     // <- here we can mutate the response, set response headers, etc
//     if (response) {
//       res.send(response);
//     } else {
//       // empty response (could be a notification)
//       res.status(204);
//       res.send("");
//     }
//   });
// });

export function startServer(port: number) {
  // start the server
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  server.on("close", () => {
    console.log("Server closed");
  });

  return server;
}
