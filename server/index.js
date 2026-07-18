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
    products: ["auth", "transactions"],
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
app.post("/dashboard", async (req, res) => {
  try {
    const { access_token } = req.body;

    // Last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    // Fetch everything in parallel
    const [authResponse, balanceResponse, transactionResponse] =
      await Promise.all([
        plaidClient.authGet({
          access_token,
        }),

        plaidClient.accountsBalanceGet({
          access_token,
        }),

        plaidClient.transactionsGet({
          access_token,
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
        }),
      ]);

    res.json({
      auth: authResponse.data,
      accounts: balanceResponse.data.accounts,
      transactions: transactionResponse.data.transactions,
    });
  } catch (err) {
    console.error(err.response?.data || err);

    res.status(500).json(
      err.response?.data || {
        error: "Unable to load dashboard",
      },
    );
  }
});
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
