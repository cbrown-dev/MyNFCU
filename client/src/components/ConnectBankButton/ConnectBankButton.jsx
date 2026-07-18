import { useEffect, useState } from "react";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import "./ConnectBankButton.css";

function ConnectBankButton({ onBankDataLoaded }) {
  const [linkToken, setLinkToken] = useState(null);
  const [publicToken, setPublicToken] = useState(null);

  // Request a Link Token when the component mounts
  useEffect(() => {
    async function fetchLinkToken() {
      try {
        const response = await axios.post("/create_link_token");
        setLinkToken(response.data.link_token);
      } catch (error) {
        console.error("Error creating Link Token:", error);
      }
    }

    fetchLinkToken();
  }, []);

  // Exchange the Public Token for an Access Token and fetch bank data
  useEffect(() => {
    if (!publicToken) return;

    async function fetchBankData() {
      try {
        const tokenResponse = await axios.post("/exchange_public_token", {
          public_token: publicToken,
        });

        const accessToken = tokenResponse.data.accessToken;

        const dashboardResponse = await axios.post("/dashboard", {
          access_token: accessToken,
        });

        onBankDataLoaded(dashboardResponse.data);
        // Send the bank data back to the parent component
        if (onBankDataLoaded) {
          onBankDataLoaded({
            auth: authResponse.data,
            transactions: transactionResponse.data,
            accounts: balanceResponse.data,
          });
        }
      } catch (error) {
        console.error("Error retrieving bank data:", error);
      }
    }

    fetchBankData();
  }, [publicToken, onBankDataLoaded]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token) => {
      setPublicToken(public_token);
    },
  });

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a Bank Account
    </button>
  );
}

export default ConnectBankButton;
