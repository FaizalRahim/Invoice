const InvoiceStatus = require('../models/invoiceStatusModel');
const Invoice = require('../models/invoiceModel');

// Create a new invoice status
const createInvoiceStatus = async (req, res) => {
  try {
    const newInvoiceStatus = await InvoiceStatus.create(req.body);
    res.status(201).json(newInvoiceStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all invoices status
const getAllInvoicesStatus = async (req, res) => {
  try {
    const invoicesStatus = await InvoiceStatus.find().populate('companyName').populate('lineItems.product');
    res.json(invoicesStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get invoice by ID
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update invoice
const updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInvoiceStatus,
  getAllInvoicesStatus,
  getInvoiceById,
  updateInvoice,
};
