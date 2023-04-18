const mongoose = require('mongoose');

//Define the schem for a client document
const clientSchema = new mongoose.Schema({
    companyName: {
        type: String,
        trim: true,
        required: true
    },
    companyAddress: {
        type: String,
        trim: true,
        required: true
    },
    companyEmail: {
        type: String,
        trim: true,
        required: true 
    },
    personInCharge: {
        type: String,
        trim: true,
        required: true 
    },
    paymentTerm: {
        type: Number,
        trim: true,
        required: true,
    },
});

//Create a Client model based on the schema
const Client = mongoose.model('Client',clientSchema);

//Export 
module.exports = Client;