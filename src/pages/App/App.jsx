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
        <nav className="flex flex-wrap justify-center">
          {isLoggedIn && (
            <>
              <Link to="/clients" className="p-4 hover:text-gray-700">
                Client List
              </Link>
              <Link to="/createClient" className="p-4 hover:text-gray-700">
                Create Client
              </Link>
              <Link to="/products" className="p-4 hover:text-gray-700">
                Product List
              </Link>
              <Link to="/createProduct" className="p-4 hover:text-gray-700">
                Create Product
              </Link>
              <Link to="/invoices" className="p-4 hover:text-gray-700">
                Invoice List
              </Link>
              <Link to="/createInvoice" className="p-4 hover:text-gray-700">
                Create Invoice
              </Link>
              <Link to="/createUser" className="p-4 hover:text-gray-700">
                Create User
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
          {!isLoggedIn && (
            <Link to="/" className="p-4 hover:text-gray-700">
            
            </Link>
          )}
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
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;




