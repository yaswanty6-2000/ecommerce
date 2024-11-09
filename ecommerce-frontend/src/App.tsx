import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./ecommerce/components/Products";
import ProductDetail from "./ecommerce/components/ProductDetail";
import WishList from "./ecommerce/components/WishList";
import Cart from "./ecommerce/components/Cart";
import Login from "./ecommerce/components/Login";
import Signup from "./ecommerce/components/Signup";
import Profile from "./ecommerce/components/Profile"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="signup" element={<Signup />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="wishList" element={<WishList />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
