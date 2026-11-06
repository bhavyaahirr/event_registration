import { Routes, Route, Link } from 'react-router-dom'
import Admin from './pages/Admin'

function App() {
  return (
    <>

    <nav>

      <Link to="/">Home</Link>

      <Link to="/admin">Admin</Link>

    </nav>
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
    </>
  )
}

export default App