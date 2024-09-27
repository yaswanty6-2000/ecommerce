import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Navbar from "./Navbar";
import { ShoppingCart, Delete } from "@mui/icons-material";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  // Load wishlist from localStorage when the component mounts
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const handleAddToCart = (product: { id: any }) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product already exists in the cart
    const existingProduct = cart.find(
      (item: { id: any }) => item.id === product.id
    );
    if (existingProduct) {
      // Increment quantity if already in cart
      existingProduct.quantity += 1;
    } else {
      // Add new product to cart
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // Optionally remove from wishlist after adding to cart
    handleRemoveFromWishlist(product.id);
  };

  const handleRemoveFromWishlist = (id: any) => {
    const updatedWishlist = wishlist.filter((item: { id: any }) => item.id !== id);
    setWishlist(updatedWishlist); // Update the state to trigger re-render
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  if (wishlist.length === 0) {
    return (
      <>
        <Navbar />
        <Typography variant="h6" style={{ marginTop: "50px" }}>
          Your wishlist is empty.
        </Typography>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px", marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom>
          Wishlist
        </Typography>
        <Grid container spacing={2}>
          {wishlist.map((product: any) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "16px",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    height: "150px",
                    width: "100%",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
                <CardContent>
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography variant="body1">${product.price}</Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                    >
                      <Delete />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Wishlist;
