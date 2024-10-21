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
        // Assuming there is only one wishlist for the application or handle it without userId
        let wishlist = await Wishlist.findOne({}); // Fetch the first wishlist or change the logic as per your requirements
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
router.delete('/remove', async (req, res) => {
    const { productId } = req.body;

    try {
        const wishlist = await Wishlist.findOne({});
        if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

        wishlist.products = wishlist.products.filter(item => item.toString() !== productId);
        await wishlist.save();
        res.status(200).json({ message: 'Product removed from wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from wishlist', error });
    }
});

module.exports = router;
