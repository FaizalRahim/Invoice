
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ClientList from '../Client/ClientList';
import CreateClient from '../Client/CreateClient';
import EditClient from '../Client/EditClient';
import ProductList from '../Product/ProductList';
import CreateProduct from '../Product/CreateProduct';
import EditProduct from '../Product/EditProduct';
import CreateInvoice from '../Invoice/CreateInvoice';
import InvoiceList from '../Invoice/InvoiceList';
import EditInvoice from '../Invoice/EditInvoice';

function App() {
  return (
    <div>
      <Router>
        <nav>
          <Link to="/clients">Client List </Link>
          <Link to="/createClient">Create Client </Link>
          <Link to="/products">Product List </Link>
          <Link to="/createProduct">Create Product </Link>
          <Link to="/invoices">Invoice List </Link>
          <Link to="/createInvoice">Create Invoice </Link>

      
        </nav>
        <Routes>
          <Route path="/clients" element={<ClientList />} />
          <Route path="/createClient" element={<CreateClient />} />
          <Route path="/Client/edit/:clientId" element={<EditClient />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/Product/edit/:productId" element={<EditProduct />} />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/createInvoice" element={<CreateInvoice />} />
          <Route path="/Invoice/edit/:invoiceId" element={<EditInvoice />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
