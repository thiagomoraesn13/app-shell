import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initAccounts } from "@thiagomoraesn13/simulation";

initAccounts({
  accountsApiUrl: import.meta.env.VITE_ACCOUNTS_API_URL,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
