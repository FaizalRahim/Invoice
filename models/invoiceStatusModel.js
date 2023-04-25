const mongoose = require('mongoose');

//Define the schema for invoiceStatus
const invoiceStatusSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Invoice',
        required: true
    },
    emailSent: {
        type: Boolean,
        required: true
    },
    paid: {
        type: Boolean,
        required: true
    }
});


//Create a InvoiceStatus model based on the schema
const InvoiceStatus = mongoose.model('InvoiceStatus',invoiceStatusSchema);

//Export 
module.exports = InvoiceStatus;