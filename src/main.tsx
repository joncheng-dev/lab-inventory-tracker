import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import { UserProvider } from "./helpers/UserContext.js";
import { BrowserRouter } from "react-router-dom";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
