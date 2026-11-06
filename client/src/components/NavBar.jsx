import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">EventReg</h1>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;