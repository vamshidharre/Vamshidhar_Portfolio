import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Global styles first so component stylesheets can build on them.
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
