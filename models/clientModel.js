const mongoose = require('mongoose');

//Define the schem for a client document
const clientSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        trim: true,
        required: true 
    },
    personInCharge: {
        type: String,
        required: true 
    },
    paymentTerm: {
        type: Number,
        required: true,
    },
});

//Create a Client model based on the schema
const Client = mongoose.model('Client',clientSchema);

//Export 
module.exports = Client;