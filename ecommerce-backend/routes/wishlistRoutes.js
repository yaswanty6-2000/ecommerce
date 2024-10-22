const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');


// Fetch wishlist items
router.get('/', async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({}).populate('products');
        if (!wishlist || wishlist.products.length === 0) {
            return res.json({ message: 'Wishlist is empty' });
        }
        res.json({ products: wishlist.products });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist', error });
    }
});

// Add product to wishlist
router.post('/add', async (req, res) => {
    const { productId } = req.body;

    try {
        let wishlist = await Wishlist.findOne();
        if (!wishlist) {
            wishlist = new Wishlist({ products: [productId] });
        } else if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
        }
        await wishlist.save();
        res.status(200).json({ message: 'Product added to wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to wishlist', error });
    }
});

// Remove product from wishlist
router.delete('/remove/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const wishlist = await Wishlist.findOne();
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }
        wishlist.products = wishlist.products.filter(item => item._id.toString() !== productId);
        await wishlist.save();
        res.status(200).json({ message: 'Product removed from wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from wishlist', error });
    }
});

// Check if a product is in the wishlist
router.get('/check', async (req, res) => {
    const { productId } = req.query;

    try {
        const wishlist = await Wishlist.find();
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        // Check if the productId exists in the wishlist's products array
        const isInWishlist = wishlist.products.includes(productId);
        res.status(200).json({ inWishlist: isInWishlist });
    } catch (error) {
        res.status(500).json({ message: 'Error checking wishlist', error });
    }
});

module.exports = router;
