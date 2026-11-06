import { EventProvider } from "./context/EventContext"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <EventProvider>
        <App />
      </EventProvider>
    </BrowserRouter>
  </StrictMode>
);