import { Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<h1>Event Registration App</h1>}
      />

      <Route
        path="/admin"
        element={<Admin />}
      />
    </Routes>
  )
}

export default App