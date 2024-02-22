// CategoryBreakdown.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Months from './Months';

const CategoryBreakdown = () => {
  const [breakdown, setBreakdown] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    fetchData(selectedMonth);
  }, [selectedMonth]);

  const fetchData = async (month) => {
    try {
      const response = await axios.get(`http://localhost:3001/breakdown?month=${month}`);
      setBreakdown(response.data);
      createChart(response.data);
    } catch (error) {
      console.error("Failed to fetch category breakdown", error);
    }
  };

  const createChart = (data) => {
    const labels = data.map(entry => entry._id);
    const amounts = data.map(entry => entry.total);

    const ctx = document.getElementById('categoryChart').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total',
          data: amounts,
          backgroundColor: amounts.map(amount => amount >= 0 ? 'green' : 'red')
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Category Breakdown',
            position: 'top',
            font: { size: 18, weight: 'bold' }
          },
          legend: {
            position: 'bottom'
          }
        },
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
          }
        },
        aspectRatio: 1, 
        maintainAspectRatio: true 
      }
    });
  };

  return (
    <div className="container category-breakdown-container">
      <div className="table-container">
        <h2>Category Breakdown</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {breakdown.map(({ _id, total }) => (
              <tr key={_id}>
                <td>{_id}</td>
                <td style={{ color: total >= 0 ? 'green' : 'red' }}>
                  ${total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="category-chart-container">
        <canvas id="categoryChart"></canvas>
      </div>
    </div>
  );
};

export default CategoryBreakdown;




