import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="p-4">
      <Router>
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="flex space-x-4">
                {isLoggedIn && (
                  <>
                    <Link to="/clients" className="text-gray-700 hover:text-gray-900">
                      Client List
                    </Link>
                    <Link to="/createClient" className="text-gray-700 hover:text-gray-900">
                      Create Client
                    </Link>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900">
                      Product List
                    </Link>
                    <Link to="/createProduct" className="text-gray-700 hover:text-gray-900">
                      Create Product
                    </Link>
                    <Link to="/invoices" className="text-gray-700 hover:text-gray-900">
                      Invoice List
                    </Link>
                    <Link to="/createInvoice" className="text-gray-700 hover:text-gray-900">
                      Create Invoice
                    </Link>
                    <Link to="/createUser" className="text-gray-700 hover:text-gray-900">
                      Create User
                    </Link>
                    <Link to="/company" className="text-gray-700 hover:text-gray-900">
                      Company Details
                    </Link>
                  </>
                )}
              </div>
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          {isLoggedIn && (
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
              <Route path="/createUser" element={<CreateUser />} />
              <Route path="/company" element={<CompanyDetails />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
