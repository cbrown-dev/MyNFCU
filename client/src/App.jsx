// The starting point for your actual user interface and layout.
// Executes second (imported and rendered inside main.jsx).
import { useEffect, useState } from "react";

import axios from "axios";
// import "./App.css";

axios.defaults.baseURL = "http://localhost:8000"; // Set the base URL for all requests

function App() {
  // AJAX request
  useEffect(() => {
    async function fetch() {
      const response = await axios.post("/create_link_token");
      console.log("response: ", response.data);
    }
    fetch();
  }, []);

  return (
    <>
      <span>Hello, Vite + React! From App.jsx</span>
    </>
  );
}

export default App;
