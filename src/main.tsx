// src/main.tsx (or src/App.tsx root)
import React from "react";
import ReactDOM from "react-dom/client";
import { WalletProvider } from "./contexts/WalletProvider";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>
);
