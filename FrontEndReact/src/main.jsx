import { StrictMode }  from "react";
import { createRoot }  from "react-dom/client";
import "./styles/main.css";   // ← single CSS import
import App             from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);