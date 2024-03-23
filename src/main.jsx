import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context.jsx";
import App from "./App.jsx";
import { ThemeProviderWrapper } from "./context/theme.context";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <ThemeProviderWrapper>
          <App />
        </ThemeProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
