import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Smart Village Connect Logo" className="logo-img" />
        <span className="logo-text">Smart Village Connect</span>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register" className="register-link">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

