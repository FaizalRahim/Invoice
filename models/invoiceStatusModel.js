const mongoose = require('mongoose');

//Define the schema for invoiceStatus
const invoiceStatusSchema = new mongoose.Schema({});


//Create a InvoiceStatus model based on the schema
const InvoiceStatus = mongoose.model('InvoiceStatus',invoiceStatusSchema);

//Export 
module.exports = InvoiceStatus;