// The application's technical entry point that mounts the program to the browser.
// Known as index.js or index.jsx in older Create React App templates.
// Executes first (loaded directly by index.html).
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
