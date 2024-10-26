require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

// Import your routes
const productRoutes = require('./routes/productRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'public', 'build'), {
    etag: false,
    maxAge: 0,
}));

// Define your API routes before the catch-all route
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);

// Define a catch-all route to serve the React app for any other request
app.get("*", (req, res) => {
    res.set("Cache-Control", "no-store");
    res.sendFile(path.join(__dirname, "public", "build", "index.html"));
});

module.exports = app;
