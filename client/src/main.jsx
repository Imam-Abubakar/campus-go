import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/AuthProvider.jsx";
import UserProvider from "./context/UserProvider.jsx";
import PWAPrompt from "react-ios-pwa-prompt";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
    <PWAPrompt
      promptOnVisit={1}
      timesToShow={10}
      copyClosePrompt="Close"
      permanentlyHideOnDismiss={false}
    />
  </React.StrictMode>
);
