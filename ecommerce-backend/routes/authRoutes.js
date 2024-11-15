const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// User Signup API
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }
        const newUser = new User({
            name,
            email,
            password,
        });
        await newUser.save();
        res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            userId: newUser._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up', error });
    }
});

// User Login API
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Logged in successfully',
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// Profile Update Route
router.put('/profile',authMiddleware, async (req, res) => {
    const userId  = req.user.id;
    const { name, email } = req.body;

    try {
        // Check if a different user already has this email
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(400).json({ message: 'Email is already in use by another account' });
        }

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Profile updated successfully', user: { name: updatedUser.name, email: updatedUser.email } });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
});

module.exports = router;
