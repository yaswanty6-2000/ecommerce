const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

// Get the cart
router.get('/', async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('products.productId'); // Populate product details
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
});

// Add a product to the cart
router.post('/add', async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne();

        if (cart) {
            // Check if the product already exists in the cart
            const existingProduct = cart.products.find(item => item.productId.toString() === productId);

            if (existingProduct) {
                // Increment quantity
                existingProduct.quantity += quantity;
            } else {
                // Add new product to cart
                cart.products.push({ productId, quantity });
            }

            await cart.save();
            res.status(200).json(cart);
        } else {
            // Create a new cart if it doesn't exist
            const newCart = new Cart({
                products: [{ productId, quantity }]
            });
            await newCart.save();
            res.status(201).json(newCart);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to cart', error });
    }
});

// Remove a product from the cart
router.delete('/remove/:productId', async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne();

        if (cart) {
            cart.products = cart.products.filter(item => item.productId.toString() !== productId);
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from cart', error });
    }
});

module.exports = router;
