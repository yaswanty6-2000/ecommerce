const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const Cart = require('../models/Cart');
const router = express.Router();

// Middleware to ensure user is authenticated and inject user ID
// Assume that user ID is set in req.user.id by the authentication middleware

// Get the user's cart
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        // Find the cart specific to the logged-in user
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return res.json({ products: [] });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
});

// Add a product to the user's cart
router.post('/add', authMiddleware, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Check if the product already exists in the user's cart
            const existingProduct = cart.products.find(item => item.productId.toString() === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
                // Remove the product if quantity is 0 or below
                if (existingProduct.quantity <= 0) {
                    cart.products = cart.products.filter(item => item.productId.toString() !== productId);
                }
            } else {
                // Add a new product if quantity is greater than 0
                if (quantity > 0) {
                    cart.products.push({ productId, quantity });
                } else {
                    return res.status(400).json({ message: 'Quantity must be greater than 0 to add a new product' });
                }
            }
            await cart.save();
            res.status(200).json(cart);
        } else {
            // Create a new cart for the user if none exists
            if (quantity > 0) {
                const newCart = new Cart({
                    userId,
                    products: [{ productId, quantity }]
                });
                await newCart.save();
                res.status(201).json(newCart);
            } else {
                return res.status(400).json({ message: 'Quantity must be greater than 0 to create a cart' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to cart', error });
    }
});

// Remove a product from the user's cart
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });

        if (cart) {
            // Remove the specified product from the cart
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

// Get a cart by cart ID (for admin or other special cases, not user-specific)
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await Cart.findById(id).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
});

module.exports = router;
