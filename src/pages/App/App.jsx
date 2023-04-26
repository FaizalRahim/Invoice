import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ClientList from '../Client/ClientList';
import CreateClient from '../Client/CreateClient';
import EditClient from '../Client/EditClient';
import ProductList from '../Product/ProductList';
import CreateProduct from '../Product/CreateProduct';
import EditProduct from '../Product/EditProduct';
import CreateInvoice from '../Invoice/CreateInvoice';
import InvoiceList from '../Invoice/InvoiceList';
import EditInvoice from '../Invoice/EditInvoice';
import CreateUser from '../User/CreateUser';
import Login from '../User/Login';
import CompanyDetails from '../CompanyDetails/CompanyDetails';
import InvoiceListSales from '../Invoice/InvoiceListSales';
import UserList from '../User/UserList'
import EditUser from '../User/EditUser';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState({});
  const [role, setRole] = useState(localStorage.getItem('role'));

  

  const handleLogin = () => {
    setRole(localStorage.getItem('role'));
    setIsLoggedIn(true);
    setUser();
  };
  


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
  };

  

  return (
    <div className="p-4">
  <Router>
  <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Easy Invoices</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
    {isLoggedIn && role !== 'Sales' && (
      <li>
        <a>
          Client
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2 bg-base-100">
          <li><Link to="/clients">Client List</Link></li>
          <li><Link to="/createClient">Create Client</Link></li>
        </ul>
      </li>
    )}
      {isLoggedIn && role !== 'Sales' && (
      <li>
        <a>
          Product
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2 bg-base-100">
          <li><Link to="/products">Product List</Link></li>
          <li><Link to="/createProduct">Create Product</Link></li>
        </ul>
      </li>
      )}
      {isLoggedIn && role !== 'Sales' && (
      <li>
        <a>
          Invoice
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2 bg-base-100">
          <li><Link to="/invoices">Invoice List</Link></li>
          <li><Link to="/createInvoice">Create Invoice</Link></li>
        </ul>
      </li>
      )} 
      {isLoggedIn && role !== 'Sales' && (
      <li>
        <a>
          New hire
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2 bg-base-100">
        <li><Link to="/createUser">Add New Staff</Link></li>
        <li><Link to="/Users">List of all staff</Link></li>
        </ul>
      </li>
      )}
      {isLoggedIn && role === 'Sales' && (
      <li>
        <a>
          Invoice
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2 bg-base-100">
          <li><Link to="/invoicesSales">Invoice List</Link></li>
        </ul>
      </li>
      )} 
      <li>
        {isLoggedIn 
          ? <button className="btn btn-outline btn-square" onClick={handleLogout}>Logout</button>
          : <Link to="/">Login</Link>
        }
      </li>
    </ul>
  </div>
</div>

    <Routes>
    <Route path="/createUser" element={<CreateUser />} />
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      {isLoggedIn && role !== 'Sales' && (
        <>
          <Route path="/clients" element={<ClientList />} />
          <Route path="/createClient" element={<CreateClient />} />
          <Route path="/Client/edit/:clientId" element={<EditClient />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/Product/edit/:productId" element={<EditProduct />} />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/createInvoice" element={<CreateInvoice />} />
          <Route path="/Invoice/edit/:invoiceId" element={<EditInvoice />} />
          <Route path="/company" element={<CompanyDetails />} />
          <Route path="/Users" element={<UserList />} />
          <Route path="/Users/edit/:userId" element={<EditUser />} />
        </>
      )}
      {isLoggedIn && role === 'Sales' && (
    <>
      <Route path="/invoicesSales" element={<InvoiceListSales />} />
    </>
  )}
</Routes>
  </Router>
</div>
  );
}

export default App;
