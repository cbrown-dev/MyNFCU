import { useEffect, useState } from "react";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import "./ConnectBankButton.css";

function PlaidAuth({ publicToken }) {
  const [account, setAccount] = useState();

  useEffect(() => {
    async function fetchData() {
      const accessToken = await axios.post("/exchange_public_token", {
        public_token: publicToken,
      });

      const auth = await axios.post("/auth", {
        access_token: accessToken.data.accessToken,
      });

      setAccount(auth.data.numbers.ach[0]);
    }

    fetchData();
  }, [publicToken]);

  return (
    account && (
      <>
        <p>Account number: {account.account}</p>
        <p>Routing number: {account.routing}</p>
      </>
    )
  );
}

function ConnectBankButton() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();

  useEffect(() => {
    async function fetchToken() {
      const response = await axios.post("/create_link_token");
      setLinkToken(response.data.link_token);
    }

    fetchToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token) => {
      setPublicToken(public_token);
    },
  });

  return publicToken ? (
    <PlaidAuth publicToken={publicToken} />
  ) : (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
}

export default ConnectBankButton;
