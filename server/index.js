// Main entry point for the server application.
// Starts up an Express server and listens for incoming requests on port 8000.
//  It directs incoming HTTP requests (like GET /users or POST /login) to the correct functional blocks of code.
// Establishes the initial connection to the database.

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Test endpoint
app.get("/hello", (request, response) => {
  response.json({ message: "Hello, World!" });
});

// Post endpoint
app.post("/test", (request, response) => {
  response.json({
    message: "Test POST request received!" + request.body.name,
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
