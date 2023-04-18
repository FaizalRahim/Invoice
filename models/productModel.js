const mongoose = require('mongoose');

//Define the schema for product
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
});


//Create a Product model based on the schema
const Product = mongoose.model('Product',productSchema);

//Export 
module.exports = Product;