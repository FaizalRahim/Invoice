const mongoose = require('mongoose');

//Define the schem for a user document
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true 
    },
    password: {
        type: String,
        trim: true,
        minLength: 6,
        required: true,
    },
});

//Create a User model based on the schema
const User = mongoose.model('User',userSchema);

//Export 
module.exports = User;