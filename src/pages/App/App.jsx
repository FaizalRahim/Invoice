
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ClientList from '../Client/ClientList';
import CreateClient from '../Client/CreateClient';
import EditClient from '../Client/EditClient';

function App() {
  return (
    <div>
      <Router>
        <nav>
          <Link to="/clients">Client List </Link>
          <Link to="/createClient">Create Client </Link>
      
        </nav>
        <Routes>
          <Route path="/clients" element={<ClientList />} />
          <Route path="/createClient" element={<CreateClient />} />
          <Route path="/Client/edit/:clientId" element={<EditClient />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
