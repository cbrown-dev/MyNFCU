// The starting point for your actual user interface and layout.
// Executes second (imported and rendered inside main.jsx).
import { useEffect, useState } from "react";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
// import "./App.css";

axios.defaults.baseURL = "http://localhost:8000"; // Set the base URL for all requests

function PlaidAuth({ publicToken }) {
  const [account, setAccount] = useState();

  useEffect(() => {
    async function fetchData() {
      let accessToken = await axios.post("/exchange_public_token", {
        public_token: publicToken,
      });
      console.log("accessToken", accessToken.data);
      const auth = await axios.post("/auth", {
        access_token: accessToken.data.accessToken,
      });
      console.log("auth data ", auth.data);
      setAccount(auth.data.numbers.ach[0]);
    }
    fetchData();
  }, []);
  return (
    account && (
      <>
        <p>Account number: {account.account}</p>
        <p>Routing number: {account.routing}</p>
      </>
    )
  );
}

function App() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
  // AJAX request
  useEffect(() => {
    async function fetch() {
      const response = await axios.post("/create_link_token");
      setLinkToken(response.data.link_token);
      // console.log("response: ", response.data);
    }
    fetch();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setPublicToken(public_token);
      console.log("Success: ", public_token, metadata);
      // send public_token to server
    },
  });

  return publicToken ? (
    <PlaidAuth publicToken={publicToken} />
  ) : (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );

  // return (
  //   <>
  //     <span>Hello, Vite + React! From App.jsx</span>
  //   </>
  // );
}

export default App;
