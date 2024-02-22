
import React, { useState } from 'react';
import axios from 'axios';
import Months from './Months';

  const OperationsPage = ({updateBalance, Months }) => {
  const [vendor, setVendor] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
 
  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
  };
  const handleVendorChange = (e) => {
    setVendor(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const buttonValue = event.nativeEvent.submitter.value
    const transaction = { vendor, amount: Number(amount * buttonValue), category, month: selectedMonth };
    
    axios.post('http://localhost:3001/transactions', transaction)
      .then(() => {
        setVendor('');
        setAmount('');
        setCategory('');
        updateBalance(Number(amount * buttonValue));
        alert('Transaction added successfully');
      })
      .catch(error => console.error("Failed to add transaction", error));
  };
  return (
    <div>
      <h1>Add a New Transaction</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={vendor}
          onChange={handleVendorChange}
          placeholder="Vendor"
          required={true}
        />
        <input min={0}  
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Amount"
          required={true}
        />
        <input
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="Category"
          required={true}
        />
      <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
        <option value="">selecte Month</option>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
         <option value="04">April</option>
         <option value="05">May</option>
         <option value="06">June</option>
         <option value="07">July</option>
         <option value="08">August</option>
         <option value="09">September</option>
         <option value="10">October</option>
         <option value="11">November</option>
         <option value="12">December</option>
      </select>
      <button type="submit" className="deposits" value={1}>Deposits</button>
      <button type="submit" className="withdraws" value={-1}>Withdraws</button>

      </form>
    </div>
  );
};

export default OperationsPage;

