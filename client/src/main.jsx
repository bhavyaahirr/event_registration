import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { EventProvider } from "./context/EventContext";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <EventProvider>
          <App />
        </EventProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);