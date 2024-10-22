import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Navbar from "./Navbar";
import { ShoppingCart, Delete } from "@mui/icons-material";
import { useHttpClient } from "../hooks/useHttpClient";
import { Product } from "../types";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<any>([]);
  const { fetchWishlistItems, removeWishlistItem, addCartItem } = useHttpClient();

  // Function to refetch wishlist items and update state
  const loadWishlist = () => {
    fetchWishlistItems()
      .then(res => {
        setWishlist(res.data?.products);
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  // Fetch wishlist items when the component mounts
  useEffect(() => {
    loadWishlist();
  }, []);

  const handleAddToCart = (product: Product) => {
    addCartItem({
      productId: product._id,
      quantity: 1
    })
      .then(() => {
        handleRemoveFromWishlist(product._id); // Remove from wishlist after adding to cart
        loadWishlist(); // Refetch wishlist to update the UI
        alert("Moved to cart");
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  const handleRemoveFromWishlist = (id: any) => {
    removeWishlistItem(id)
      .then(() => {
        loadWishlist(); // Refetch wishlist after removing item
        alert('Deleted from wishlist');
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  if (wishlist?.length === 0) {
    return (
      <>
        <Navbar />
        <Typography variant="h4" style={{ marginTop: "50px" }}>Wishlist</Typography>
        <Typography variant="h6">
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
          {wishlist?.map((product: any) => (
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
                  src={product.imageUrl}
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
                      onClick={() => handleRemoveFromWishlist(product._id)}
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
