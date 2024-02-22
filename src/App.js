import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import TransactionsPage from './components/TransactionsPage';
import OperationsPage from './components/OperationsPage';
import CategoryBreakdown from './components/CategoryBreakdown';
import Loan from './components/Loan';
import Months from './components/Months';
import './App.css';

function App() {
  const [balance, setBalance] = useState(400);
  

  const handleMonthChange = (selectedMonth) => {
    console.log(`Selected month: ${selectedMonth}`);
  };

  const updateBalance = (transactionAmount) => {
    const updatedBalance = balance + transactionAmount;
    setBalance(updatedBalance);
  };

  return (
    <Router>
      <div className="App">
        <Nav balance={balance} />
      
        <Routes>
          <Route path="/" element={<TransactionsPage />} />
          <Route path="/operations" element={<OperationsPage updateBalance={updateBalance} Months={Months}/>} />
          <Route path="/breakdown" element={<CategoryBreakdown />} />
          <Route path="/loan" element={<Loan updateBalance={updateBalance} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


