import React from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  }
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Online Store</h1>
      </div>
      <div className="navbar-right">
        <ul>
          <li>
            <Link to="/products">Product List</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Button onClick={handleLogout}>Logout</Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
