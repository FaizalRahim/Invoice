import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import easyinvoice from 'easyinvoice';
import { saveAs } from 'file-saver';

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const navigateTo = useNavigate();
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}`},};

  useEffect(() => {
    fetch('/api/invoices', config)
      .then(response => response.json())
      .then(data => setInvoices(data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/invoices/${id}`, config);
      if (response.status === 200) {
        setProducts(invoices.filter((invoice) => invoice._id !== id));
      } else {
        console.log('Failed to delete invoice');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const invoice = await axios.get(`/api/invoices/${id}`, config);
      const updatedInvoice = { ...invoice.data };
      const response = await axios.put(`/api/invoices/${id}`, updatedInvoice, config);
      if (response.status === 200) {
        const updatedInvoice = response.data;
        console.log(updatedInvoice);
        navigateTo(`/Invoice/edit/${id}`);
      } else {
        console.log('Failed to update invoice');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generatePdfBlob = async (data) => {
    
  
    return new Promise(async (resolve) => {
      easyinvoice.createInvoice(data, async (result) => {
        const pdfData = await fetch(`data:application/pdf;base64,${result.pdf}`);
        const pdfBlob = await pdfData.blob();
        resolve(pdfBlob);
      });
    });
  };
  

  const handleGeneratePdf = async (id) => {
    try {
      const [invoiceResponse, companyResponse] = await Promise.all([
        axios.get(`/api/invoices/${id}`, config),
        axios.get('/api/company', config),
      ]);
  
      const invoiceData = invoiceResponse.data;
      const companyData = companyResponse.data[0];

      // Extract necessary information from invoiceData
      const {
      companyName: { companyName, companyAddress, companyEmail },
      invoiceNumber,
      dueDate,
      lineItems,
      invoiceDate,
    } = invoiceData;

      const {
        userCompanyName,
        userCompanyAddress,
        companyBankAccount,
      } = companyData;

      const data = {
        "documentTitle": "INVOICE",
        "locale": "en",
        "currency": "SGD",
        "taxNotation": "GST",
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "", // Add your logo URL here
        "sender": {
          "company": userCompanyName,
          "address": userCompanyAddress,
          
        },
        "translate": {
          "number": "Invoice Number",
          "vat" : "GST"
        },
        "client": {
          "company": companyName, 
          "address": companyAddress, 
        },
        "information": {
          "number": invoiceNumber.toString(),
          "date": new Date(invoiceDate).toLocaleDateString(),
          "due-date": new Date(dueDate).toLocaleDateString(),
        },
        "products": lineItems.map(item => ({
          "quantity": item.quantity,
          "description": item.product.productName,
          "tax-rate": 8, 
          "price": item.product.unitPrice
        })),
      };

      // Generate the invoice PDF
      easyinvoice.createInvoice(data, async (result) => {
        const pdfData = await fetch(`data:application/pdf;base64,${result.pdf}`);
        const pdfBlob = await pdfData.blob();
        saveAs(pdfBlob, `Invoice_${invoiceData.invoiceNumber}.pdf`);
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleSendEmail = async (id) => {
    try {
      const [invoiceResponse, companyResponse] = await Promise.all([
        axios.get(`/api/invoices/${id}`, config),
        axios.get('/api/company', config),
      ]);
  
      const invoiceData = invoiceResponse.data;
      const companyData = companyResponse.data[0];

      const {
      companyName: { companyName, companyAddress, companyEmail },
      invoiceNumber,
      dueDate,
      lineItems,
      invoiceDate,
    } = invoiceData;

      const {
        userCompanyName,
        userCompanyAddress,
        companyBankAccount,
      } = companyData;

      const data = {
        "documentTitle": "INVOICE",
        "locale": "en",
        "currency": "SGD",
        "taxNotation": "GST",
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "", // Add your logo URL here
        "sender": {
          "company": userCompanyName,
          "address": userCompanyAddress,
          
        },
        "translate": {
          "number": "Invoice Number",
          "vat" : "GST"
        },
        "client": {
          "company": companyName, 
          "address": companyAddress, 
        },
        "information": {
          "number": invoiceNumber.toString(),
          "date": new Date(invoiceDate).toLocaleDateString(),
          "due-date": new Date(dueDate).toLocaleDateString(),
        },
        "products": lineItems.map(item => ({
          "quantity": item.quantity,
          "description": item.product.productName,
          "tax-rate": 8, 
          "price": item.product.unitPrice
        })),
      };

  
      // Generate the invoice PDF
      const pdfBlob = await generatePdfBlob(data);
      
      // Send email with invoice PDF attachment
      const formData = new FormData();
      formData.append('message', `Please find attached invoice ${invoiceNumber}.`);
      formData.append('invoiceNumber', invoiceNumber.toString());
      formData.append('client', JSON.stringify(companyName));
      formData.append('companyEmail', JSON.stringify(companyEmail));
      formData.append('invoice', pdfBlob, `Invoice_${invoiceNumber}.pdf`);
      
      const emailResponse = await axios.post(`/api/email`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage(`Email sent successfully for invoice ${invoiceNumber}.`);
      console.log(emailResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  



  
  return (
    <div className="p-4 bg-white rounded-md shadow-md">
  <h1 className="text-2xl font-bold mb-4">Invoices</h1>
  {successMessage && <p className="mb-4 text-green-500">{successMessage}</p>}
  <ul className="divide-y divide-gray-200">
    {invoices.map((invoice) => (
      <li key={invoice._id} className="py-4 flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <h2 className="font-bold text-lg">Invoice Number:</h2>
            <span className="text-lg">{invoice.invoiceNumber}</span>
          </div>
          <div className="flex justify-between">
            <h2 className="font-bold text-lg">Client Name:</h2>
            <span className="text-lg">{invoice.companyName.companyName}</span>
          </div>
          <div className="flex justify-between">
            <h2 className="font-bold text-lg">Invoice Date:</h2>
            <span className="text-lg">{new Date(invoice.invoiceDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <h2 className="font-bold text-lg">Due Date:</h2>
            <span className="text-lg">{new Date(invoice.dueDate).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600" onClick={() => handleDelete(invoice._id)}>
            Delete
          </button>
          <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600" onClick={() => handleEdit(invoice._id)}>
            Edit
          </button>
          <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600" onClick={() => handleGeneratePdf(invoice._id)}>
            Download PDF
          </button>
          <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-500 hover:bg-purple-600" onClick={() => handleSendEmail(invoice._id)}>
            Send Email
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>


  );
}

export default InvoiceList;