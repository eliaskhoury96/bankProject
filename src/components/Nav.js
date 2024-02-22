
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = ({balance}) => {
  
  return (
    <div className="navbar">
      <div style={{ color: balance < 500 ? 'red' : 'green' }}>
        Balance: ${balance}
      </div>
      <Link to="/" className="home-link">Transactions</Link>
      <Link to="/operations" className="operations-link">Operations</Link>
      <Link to="/breakdown" className="breakdown-link">Breakdown</Link>
      <Link to="/loan" className="loan-link">loan</Link>
    </div>
  );
};

export default Nav;
