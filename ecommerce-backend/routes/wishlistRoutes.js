const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const { authMiddleware } = require('../middleware/authMiddleware'); // Import the token verification middleware

// Fetch wishlist items for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
    const userId = req.user.id; // Get the user ID from the token
    try {
        const wishlist = await Wishlist.findOne({ userId }).populate('products');
        if (!wishlist || wishlist.products.length === 0) {
            return res.json({ products: [] });
        }
        res.json({ products: wishlist.products });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist', error });
    }
});

// Add product to wishlist for the authenticated user
router.post('/add', authMiddleware, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id; // Get the user ID from the token

    try {
        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            wishlist = new Wishlist({ userId, products: [productId] });
        } else if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
        }
        await wishlist.save();
        res.status(200).json({ message: 'Product added to wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to wishlist', error });
    }
});

// Remove product from wishlist for the authenticated user
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id; // Get the user ID from the token

    try {
        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }
        wishlist.products = wishlist.products.filter(item => item.toString() !== productId);
        await wishlist.save();
        res.status(200).json({ message: 'Product removed from wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from wishlist', error });
    }
});

// Check if a product is in the wishlist for the authenticated user
router.get('/check', authMiddleware, async (req, res) => {
    const { productId } = req.query;
    const userId = req.user.id; // Get the user ID from the token

    try {
        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        const isInWishlist = wishlist.products.includes(productId);
        res.status(200).json({ inWishlist: isInWishlist });
    } catch (error) {
        res.status(500).json({ message: 'Error checking wishlist', error });
    }
});

module.exports = router;
