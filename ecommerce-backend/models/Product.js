const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now }
}, {
    versionKey: false  // This disables the __v field from response
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

