import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import { UserProvider } from "./helpers/UserContext.tsx";
import { PreferencesProvider } from "./helpers/PreferencesContext.tsx";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <PreferencesProvider>
        <App />
      </PreferencesProvider>
    </UserProvider>
  </React.StrictMode>
);
