// src/components/CryptoTable/PriceChange.jsx
import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import './PriceChange.css';

const PriceChange = ({ value }) => {
  const isPositive = value > 0;
  const className = isPositive ? 'positive' : value < 0 ? 'negative' : 'neutral';
  const Icon = isPositive ? FiArrowUp : FiArrowDown;
  
  return (
    <span className={`price-change ${className}`}>
      {value !== 0 && <Icon className="change-arrow" />}
      {Math.abs(value).toFixed(2)}%
    </span>
  );
};

export default PriceChange;