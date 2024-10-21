import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
