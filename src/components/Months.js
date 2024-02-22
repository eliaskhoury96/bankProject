import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Months = ({ onMonthChange, getAll }) => {
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    fetchData(selectedMonth);
  }, []);
  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month); if (month === ""){
      getAll()
    }

    else fetchData(month);
  };
  const fetchData = async (month) => {
    try {
      const response = await axios.get(`http://localhost:3001/transactions-by-month/${month}`);
      console.log(response.data)
      onMonthChange(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions for the selected month', error);
    }
  };
  return (
    <div>
      <label htmlFor="monthSelect">Select Month:</label>
      <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
        <option value="">All</option>
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
    </div>
  );
};
export default Months;




