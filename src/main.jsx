import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./context/authContext.jsx";
import { UserContextProvider } from "./context/userContext.jsx";

import "./index.css";
import App from "./App.jsx";
import "animate.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
