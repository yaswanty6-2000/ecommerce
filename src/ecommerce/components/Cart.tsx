import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import Navbar from './Navbar';
import { RemoveShoppingCartRounded, Add, Remove } from '@mui/icons-material';

const Cart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const handleIncrement = (id: any) => {
        const updatedCart = cart.map((item: { id: any; quantity: number; }) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        // Trigger UI update (use state or context)
    };

    const handleDecrement = (id: any) => {
        const updatedCart = cart.map((item: { id: any; quantity: number; }) => {
            if (item.id === id) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return null; // This item will be removed
                }
            }
            return item;
        }).filter((item: null) => item !== null); // Remove null items

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        // Trigger UI update (use state or context)
    };

    const handleRemove = (id: any) => {
        const updatedCart = cart.filter((item: { id: any; }) => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        // Trigger UI update (use state or context)
    };

    return (
        <div style={{ padding: '20px' }}>
            <Navbar />
            <Typography variant="h4" gutterBottom style={{ marginTop: '50px' }}>
                Shopping Cart
            </Typography>
            <Grid container spacing={2}>
                {cart.length === 0 ? (
                    <Typography variant="h6">Your cart is empty.</Typography>
                ) : (
                    cart.map((item: any) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
                                <img src={item.image} alt={item.name} style={{ height: '150px', width: '100%', objectFit: 'cover', marginBottom: '10px' }} />
                                <CardContent>
                                    <Typography variant="h5">{item.name}</Typography>
                                    <Typography>Quantity: {item.quantity}</Typography>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', width: '100%' }}>
                                        <Button variant="outlined" onClick={() => handleIncrement(item.id)}><Add /></Button>
                                        &nbsp;
                                        <Button variant="outlined" onClick={() => handleDecrement(item.id)}><Remove /></Button>
                                        &nbsp;
                                        <Button variant="contained" color="error" onClick={() => handleRemove(item.id)}><RemoveShoppingCartRounded /></Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    );
};

export default Cart;
