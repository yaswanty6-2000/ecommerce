import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button, Snackbar } from "@mui/material";
import { AddShoppingCart, Favorite } from "@mui/icons-material";
import Navbar from "./Navbar";
import { useHttpClient } from "../hooks/useHttpClient";
import { Product } from "../types";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [productsData, setProductsData] = useState<Product[]>([]);
  const product = productsData.find((p: Product) => p._id === id);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { fetchProducts,
    addCartItem, addWishlistItem, checkWishlistItem
  } = useHttpClient();

  useEffect(() => {
    fetchProducts().then(res => {
      setProductsData(res.data);
    })
      .catch(err => {
        console.log("Error", err)
      })
  }, [])

  // check for item in wishlist
  const isItemInWishlist = () => {
    checkWishlistItem(id)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log("Error", err);
      })
    return false;
  }


  const handleAddToCart = () => {
    addCartItem({
      productId: id,
      quantity: 1
    })
      .then(res => {
        setToastMessage("Added to Cart!");
        setOpenToast(true);
      })
      .catch(err => {
        console.log("Error", err);
      })
  };

  const handleAddToWishlist = () => {
    // Check if product already exists in the wishlist
    const inWishList = isItemInWishlist();
    if (!inWishList) {
      addWishlistItem({
        productId: id
      }).then(res => {
        setToastMessage("Added to Wishlist!");
      })
        .catch(err => {
          console.log('Error', err);
        })
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
          height: "100vh",
        }}
      >
        <Card style={{ maxWidth: "500px", width: "100%" }}>
          <img
            src={product.imageUrl}
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
        autoHideDuration={3000}
      />
    </>
  );
};

export default ProductDetail;
