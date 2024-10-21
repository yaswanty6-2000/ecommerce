import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./ecommerce/components/Navbar";
import Products from "./ecommerce/components/Products";
import ProductDetail from "./ecommerce/components/ProductDetail";
import WishList from "./ecommerce/components/WishList";
import Cart from "./ecommerce/components/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="wishList" element={<WishList />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
