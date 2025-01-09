import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
    import Dashboard from './components/Dashboard';
    import Transactions from './components/Transactions';
    import AddTransaction from './components/AddTransaction';
    import Categories from './components/Categories';
    
    function App() {
      return (
        <Router>
          <div className="container">
            <h1>Financial Tracker</h1>
            <nav>
              <Link to="/">Dashboard</Link>
              <Link to="/transactions">Transactions</Link>
              <Link to="/add">Add Transaction</Link>
              <Link to="/categories">Categories</Link>
            </nav>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/add" element={<AddTransaction />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </div>
        </Router>
      );
    }
    
    export default App;
