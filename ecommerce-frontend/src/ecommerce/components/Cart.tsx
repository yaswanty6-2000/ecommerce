import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Navbar from "./Navbar";
import { useHttpClient } from "../hooks/useHttpClient";
import { Add, Remove, RemoveShoppingCartRounded, Favorite } from "@mui/icons-material";

const Cart = () => {
  const [cart, setCart] = useState<any>([]);

  const { fetchCartItems, addCartItem, removeCartItem, getCartItemById, addWishlistItem } = useHttpClient();

  // Function to refetch the cart and update state
  const loadCart = () => {
    fetchCartItems()
      .then(res => {
        setCart(res.data);
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  // Fetch cart items when the component mounts
  useEffect(() => {
    loadCart();
  }, []);

  const handleIncrement = (id: string) => {
    addCartItem({
      productId: id,
      quantity: 1
    })
      .then(() => {
        loadCart(); // Refetch cart after incrementing quantity
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  const handleDecrement = (id: string) => {
    addCartItem({
      productId: id,
      quantity: -1
    })
      .then(() => {
        loadCart(); // Refetch cart after decrementing quantity
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  const handleRemove = (id: any) => {
    removeCartItem(id)
      .then(() => {
        loadCart(); // Refetch cart after removing the item
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  const handleMoveToWishlist = (product: any) => {
    addWishlistItem({
      productId: product?.productId?._id
    })
      .then(() => {
        // handleRemove(product?.productId?._id);
        alert('Moved to wishlist from cart');
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  // Calculate total cart value
  const totalCartValue = () => {
    return cart.products?.reduce(
      (total: number, item: any) => total + (item.productId.price * item.quantity),
      0
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <Typography variant="h4" gutterBottom style={{ marginTop: "50px" }}>
        Shopping Cart
      </Typography>
      <Grid container spacing={2}>
        {cart.products?.length === 0 ? (
          <Typography variant="h6">Your cart is empty.</Typography>
        ) : (
            cart.products?.map((item: any) => (
              <Grid item xs={12} sm={6} md={4} key={item?.productId?._id}>
              <Card
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "16px",
                }}
              >
                <img
                    src={item?.productId?.imageUrl}
                    alt={item?.productId?.name}
                  style={{
                    height: "150px",
                    width: "100%",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
                <CardContent>
                    <Typography variant="h5">{item?.productId?.name}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                    <Typography>Price: ${item?.productId?.price}</Typography>
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
                        onClick={() => handleIncrement(item?.productId?._id)}
                    >
                      <Add />
                    </Button>
                    &nbsp;
                    <Button
                      variant="outlined"
                        onClick={() => handleDecrement(item?.productId?._id)}
                    >
                      <Remove />
                    </Button>
                    &nbsp;
                    <Button
                      variant="outlined"
                      color="error"
                        onClick={() => handleRemove(item?.productId?._id)}
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

      {cart?.products?.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <Typography variant="h5">
            Total Cart Value: ${totalCartValue().toFixed(2)}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Cart;
