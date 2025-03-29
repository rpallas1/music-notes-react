import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Entry point for the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {import.meta.env.PROD ? (
      <App />
    ) : (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )}
  </>,
);
