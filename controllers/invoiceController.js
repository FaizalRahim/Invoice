const Invoice = require('../models/invoiceModel');
const Product = require('../models/productModel');
const Client = require('../models/clientModel');

// Create a new invoice
const createInvoice = async (req, res) => {
    try {
      const newInvoice = await Invoice.create(req.body);
      res.status(201).json(newInvoice);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all invoices
  const getAllInvoices = async (req, res) => {
    try {
      const invoices = await Invoice.find().populate('companyName').populate('lineItems.product');
      res.json(invoices);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get a single invoice by id
  const getInvoiceById = async (req, res) => {
    try {
      const invoice = await Invoice.findById(req.params.id)
        .populate('companyName')
        .populate('lineItems.product');
      if (invoice === null) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.json(invoice);
    } catch (error) {
      console.error('Error in getInvoiceById:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
  // Update an invoice by id
  const updateInvoice = async (req, res) => {
    try {
      const invoice = await Invoice.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      ).populate('companyName').populate('lineItems.product');
  
      if (invoice === null) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.json(invoice);
    } catch (error) {
      console.error('Error in updateInvoice:', error);
      res.status(400).json({ message: error.message });
    }
  };
  
  
  // Delete an invoice by id
  const deleteInvoice = async (req, res) => {
    try {
      const invoice = await Invoice.findById(req.params.id);
      if (invoice === null) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      await Invoice.findByIdAndDelete(req.params.id);
      res.json({ message: 'Invoice deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports={
    createInvoice ,
    getAllInvoices,
    getInvoiceById,
    deleteInvoice,
    updateInvoice,
};