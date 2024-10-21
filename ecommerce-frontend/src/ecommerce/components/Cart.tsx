import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Navbar from "./Navbar";
import {
  RemoveShoppingCartRounded,
  Add,
  Remove,
  Favorite,
} from "@mui/icons-material";

const Cart = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const handleIncrement = (id: any) => {
    const updatedCart = cart.map((item: { id: any; quantity: number }) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrement = (id: any) => {
    const updatedCart = cart
      .map((item: { id: any; quantity: number }) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null);

    setCart(updatedCart as any[]);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (id: any) => {
    const updatedCart = cart.filter((item: { id: any }) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleMoveToWishlist = (product: any) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    // Add the product to the wishlist if not already present
    const existingProduct = wishlist.find(
      (item: { id: any }) => item.id === product.id
    );
    if (!existingProduct) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    // Remove the product from the cart
    handleRemove(product.id);
  };

  // Calculate total cart value
  const totalCartValue = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <Typography variant="h4" gutterBottom style={{ marginTop: "50px" }}>
        Shopping Cart
      </Typography>
      <Grid container spacing={2}>
        {cart.length === 0 ? (
          <Typography variant="h6">Your cart is empty.</Typography>
        ) : (
          cart.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "16px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    height: "150px",
                    width: "100%",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
                <CardContent>
                  <Typography variant="h5">{item.name}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                  <Typography>Price: ${item.price}</Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                      width: "100%",
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => handleIncrement(item.id)}
                    >
                      <Add />
                    </Button>
                    &nbsp;
                    <Button
                      variant="outlined"
                      onClick={() => handleDecrement(item.id)}
                    >
                      <Remove />
                    </Button>
                    &nbsp;
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemove(item.id)}
                    >
                      <RemoveShoppingCartRounded />
                    </Button>
                    &nbsp;
                    <Button
                      variant="outlined"
                      onClick={() => handleMoveToWishlist(item)}
                    >
                      <Favorite />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {cart.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <Typography variant="h5">
            Total: ${totalCartValue.toFixed(2)}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Cart;
