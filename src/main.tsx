import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import { UserProvider } from "./helpers/UserContext.tsx";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
