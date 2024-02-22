import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Months from './Months';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    fetchTransactions();
    setCurrentMonth(getCurrentMonth());
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/');
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/transactions/${id}`);
      setTransactions(transactions.filter(transaction => transaction._id !== id));
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };

  const getCurrentMonth = () => {
    const date = new Date();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    return `${month < 10 ? '0' + month : month}/${year}`;
  };

  return (
    <div className="transactions-page-container">
      <Months onMonthChange={setTransactions} getAll={fetchTransactions} />
      <h1>Transactions for {currentMonth}</h1>
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
           <th>Month</th>
           
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.vendor}</td>
              <td>{transaction.category}</td>
              <td className={`transactions-amount ${transaction.amount < 0 ? 'transactions-amount-red' : 'transactions-amount-green'}`}>{transaction.amount}</td>
              <td><button className="transactions-list-item-delete" onClick={() => handleDelete(transaction._id)}>Delete</button></td>
              <td>{transaction.month}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;






















