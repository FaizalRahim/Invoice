const mongoose = require('mongoose');

//Define the schema for a single line item in invoice
const invoiceLineItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

//Define the schema for an invoice
const invoiceSchema = new mongoose.Schema({
    companyName: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client',
        required: true
    },
    invoiceNumber: {
        type: Number,
        required: true,
        unique: true
    },
    invoiceDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    lineItems: [invoiceLineItemSchema]

});

//Create a Invoice model based on the schema
const Invoice = mongoose.model('Invoice',invoiceSchema);

//Export 
module.exports = Invoice;