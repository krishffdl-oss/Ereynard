import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // <--- YE LINE ADD KARO

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);