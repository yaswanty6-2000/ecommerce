import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { productsData } from "../store/data";
import { Card, CardContent, Typography, Button, Snackbar } from "@mui/material";
import { AddShoppingCart, Favorite } from "@mui/icons-material";
import Navbar from "./Navbar";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = productsData.find((p) => p.id === parseInt(id!));

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product already exists in the cart
    const existingProduct = cart.find((item: any) => item.id === product?.id);
    if (existingProduct) {
      // Increment quantity if already in cart
      existingProduct.quantity += 1;
    } else {
      // Add new product to cart
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setToastMessage("Added to Cart!");
    setOpenToast(true);
  };

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    // Check if product already exists in the wishlist
    const existingProduct = wishlist.find(
      (item: any) => item.id === product?.id
    );
    if (!existingProduct) {
      wishlist.push(product); // Add new product to wishlist
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setToastMessage("Added to Wishlist!");
    } else {
      setToastMessage("Already in Wishlist!");
    }

    setOpenToast(true);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleToastClose = () => {
    setOpenToast(false);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Vertically center
        }}
      >
        <Card style={{ maxWidth: "500px", width: "100%" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ height: "300px", width: "100%" }}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              {product.name}
            </Typography>

            <Typography variant="h5" color="primary" align="center">
              ${product.price}
            </Typography>

            <Typography variant="body1">
              {showFullDescription
                ? product.description
                : `${product.description.substring(0, 100)}...`}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={toggleDescription}
              style={{
                marginTop: "10px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {showFullDescription ? "Show Less" : "Show More"}
            </Button>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={handleAddToCart}
                style={{
                  borderRadius: "50%",
                  minWidth: "56px",
                  height: "56px",
                  padding: "0",
                }}
              >
                <AddShoppingCart />
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={handleAddToWishlist}
                style={{
                  borderRadius: "50%",
                  minWidth: "56px",
                  height: "56px",
                  padding: "0",
                }}
              >
                <Favorite />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Snackbar
        open={openToast}
        onClose={handleToastClose}
        message={toastMessage}
        autoHideDuration={3000} // Automatically hide after 3 seconds
      />
    </>
  );
};

export default ProductDetail;
