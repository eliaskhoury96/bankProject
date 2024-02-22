import React, { useEffect, useState } from 'react';
import axios from 'axios';

    const Loan= ({updateBalance}) => {
    const [amount, setAmount] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('');
 
    const handleMonthChange = (event) => {
      const month = event.target.value;
      setSelectedMonth(month);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const buttonValue = event.nativeEvent.submitter.value
        const transaction = {vedor:"bank", amount: Number(amount * buttonValue), category:'bank', month: selectedMonth};
        axios.post('http://localhost:3001/transactions', transaction)
          .then(() => {
            setAmount('');
            updateBalance(Number(amount * buttonValue));
            alert('Transaction added successfully');
          })
          .catch(error => console.error("Failed to add transaction", error));
      };
      const handleAmountChange = (e) => {
        setAmount(e.target.value);
      };
    
    return (
        <div>
          <h1>LOAN</h1>
          <form onSubmit={handleSubmit}>
            <input min={0}  
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Amount"
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
          <button type="submit" className="loan" value={1}>LOAN</button>
          </form>
        </div>
      );
    };
    
  
  export default Loan;