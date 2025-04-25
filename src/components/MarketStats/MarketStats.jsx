import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMarketStats } from '../../redux/cryptoSlice';
import { FiArrowUp, FiArrowDown, FiClock } from 'react-icons/fi';
import './MarketStats.css';

const MarketStats = () => {
  const stats = useSelector(selectMarketStats);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  // Update the clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);
  
  const formatChange = (value) => {
    const isPositive = value > 0;
    const icon = isPositive ? <FiArrowUp className="up-icon" /> : <FiArrowDown className="down-icon" />;
    
    return (
      <span className={`change-indicator ${isPositive ? 'positive' : 'negative'}`}>
        {icon} {Math.abs(value)}%
      </span>
    );
  };
  
  return (
    <div className="market-stats-container">
      <div className="stat-card">
        <h3>Market Cap</h3>
        <div className="stat-value">
          ${stats.totalMarketCap}T
          {formatChange(stats.totalMarketCapChange)}
        </div>
      </div>
      
      <div className="stat-card">
        <h3>24h Volume</h3>
        <div className="stat-value">
          ${stats.volume24h}B
          {formatChange(stats.volumeChange)}
        </div>
      </div>
      
      <div className="stat-card">
        <h3>BTC Dominance</h3>
        <div className="stat-value">
          {stats.btcDominance}%
          {formatChange(stats.btcDominanceChange)}
        </div>
      </div>
      
      <div className="stat-card">
        <h3>Cryptocurrencies</h3>
        <div className="stat-value">
          {stats.totalCryptocurrencies}
          <span className="new-cryptos">+{stats.newCryptos} today</span>
        </div>
      </div>
      
      <div className="stat-card">
        <h3>Last Updated</h3>
        <div className="stat-value">
          <FiClock className="clock-icon" />
          {currentTime}
          <div className="update-note">Simulated real-time data</div>
        </div>
      </div>
    </div>
  );
};

export default MarketStats;