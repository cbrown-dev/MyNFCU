// Main entry point for the server application.
// Starts up an Express server and listens for incoming requests on port 8000.
//  It directs incoming HTTP requests (like GET /users or POST /login) to the correct functional blocks of code.
// Establishes the initial connection to the database.
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);
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

app.post("/create_link_token", async function (request, response) {
  // Get the client_user_id by searching for the current user
  const linkTokenRequest = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: "user",
    },
    client_name: "Plaid Test App",
    products: ["auth"],
    language: "en",
    country_codes: ["US"],
  };
  try {
    const createTokenResponse =
      await plaidClient.linkTokenCreate(linkTokenRequest);
    response.json(createTokenResponse.data);
  } catch (error) {
    console.error(error.response?.data || error);
    response.status(500).json(error.response?.data || error);
  }
});

app.post("/auth", async function (request, response) {
  try {
    const access_token = request.body.access_token;
    const plaidRequest = {
      access_token: access_token,
    };
    const plaidResponse = await plaidClient.authGet(plaidRequest);
    response.json(plaidResponse.data);
  } catch (e) {
    response.status(500).send("Auth endpoint failed");
  }
});

app.post("/exchange_public_token", async function (request, response, next) {
  const publicToken = request.body.public_token;
  try {
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = tokenResponse.data.access_token;

    response.json({ accessToken });
  } catch (error) {
    // handle error
    response
      .status(500)
      .send("Error exchanging public token: " + error.message);
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
