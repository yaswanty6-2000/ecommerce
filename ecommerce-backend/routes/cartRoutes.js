const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

// Get the cart
router.get('/', async (req, res) => {
    try {
        // populate the products data
        const cart = await Cart.findOne().populate('products.productId');
        if (!cart) {
            return res.json({ products: [] });
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
            const existingProduct = cart.products.find(item => item.productId.toString() === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
                if (existingProduct.quantity <= 0) {
                    cart.products = cart.products.filter(item => item.productId.toString() !== productId);
                }
            } else {
                if (quantity > 0) {
                    cart.products.push({ productId, quantity });
                } else {
                    return res.status(400).json({ message: 'Quantity must be greater than 0 to add a new product' });
                }
            }

            await cart.save();
            res.status(200).json(cart);
        } else {
            if (quantity > 0) {
                const newCart = new Cart({
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

// Get cart by ID
router.get('/:id', async (req, res) => {
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
