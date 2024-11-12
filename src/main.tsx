import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TimeContextProvider } from "./context/TimeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TimeContextProvider>
      <App />
    </TimeContextProvider>
  </StrictMode>
);
