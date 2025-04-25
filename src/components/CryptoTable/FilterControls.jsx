import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterBy, setCurrency, addCustomCrypto } from '../../redux/cryptoSlice';
import { FiRefreshCw, FiPlus, FiX } from 'react-icons/fi';
import './FilterControls.css';

const FilterControls = () => {
  const dispatch = useDispatch();
  const { filterBy, currency } = useSelector(state => state.crypto.filter);
  
  // State for the add crypto modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCrypto, setNewCrypto] = useState({
    name: '',
    symbol: '',
    price: '',
    change24h: ''
  });
  
  const handleAssetFilterChange = (e) => {
    const newFilter = e.target.value;
    dispatch(setFilterBy(newFilter));
    console.log(`Filter changed to: ${newFilter}`);
  };
  
  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    dispatch(setCurrency(newCurrency));
    console.log(`Currency changed to: ${newCurrency}`);
  };
  
  const handleRefresh = () => {
    // Add a spinning animation to the refresh icon
    const refreshBtn = document.querySelector('.refresh-btn .refresh-icon');
    if (refreshBtn) {
      refreshBtn.classList.add('spinning');
    }
    
    // Reload the entire page after a brief delay
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  
  const handleAddCryptoClick = () => {
    setShowAddModal(true);
  };
  
  // Use useCallback to memoize the handleCloseModal function
  const handleCloseModal = useCallback(() => {
    setShowAddModal(false);
    setNewCrypto({
      name: '',
      symbol: '',
      price: '',
      change24h: ''
    });
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCrypto(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddCrypto = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!newCrypto.name || !newCrypto.symbol || !newCrypto.price) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Create a new crypto object
    const cryptoToAdd = {
      id: `custom-${Date.now()}`,
      name: newCrypto.name,
      symbol: newCrypto.symbol.toUpperCase(),
      price: parseFloat(newCrypto.price),
      change24h: parseFloat(newCrypto.change24h) || 0,
      volume24h: 0,
      marketCap: 0,
      isCustom: true
    };
    
    // Dispatch to Redux
    dispatch(addCustomCrypto(cryptoToAdd));
    
    // Close modal and reset form
    handleCloseModal();
    console.log('Added custom cryptocurrency:', cryptoToAdd);
  };
  
  // Handle clicking outside to close modal
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showAddModal && e.target.classList.contains('modal-overlay')) {
        handleCloseModal();
      }
    };
    
    if (showAddModal) {
      document.addEventListener('click', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showAddModal, handleCloseModal]);
  
  // Keyboard accessibility - escape key closes modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && showAddModal) {
        handleCloseModal();
      }
    };
    
    if (showAddModal) {
      window.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [showAddModal, handleCloseModal]);
  
  return (
    <div className="filter-controls">
      <div className="filter-title">
        <h2>Cryptocurrency Prices</h2>
        <span className="live-indicator">Live</span>
        <span className="current-selection">
          Showing: <strong>{filterBy === 'all' ? 'All Assets' : 
                   filterBy === 'gainers' ? 'Top Gainers' : 'Top Losers'}</strong> in <strong>{currency}</strong>
        </span>
      </div>
      
      <div className="filter-actions">
        <select 
          className="filter-select"
          value={filterBy}
          onChange={handleAssetFilterChange}
          data-testid="filter-select"
        >
          <option value="all">All Assets</option>
          <option value="gainers">Top Gainers</option>
          <option value="losers">Top Losers</option>
        </select>
        
        <select 
          className="currency-select"
          value={currency}
          onChange={handleCurrencyChange}
          data-testid="currency-select"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
        
        <button className="refresh-btn" onClick={handleRefresh} title="Reload data">
          <FiRefreshCw className="refresh-icon" /> Refresh
        </button>
        
        <button className="add-crypto-btn" onClick={handleAddCryptoClick}>
          <FiPlus /> Add Crypto
        </button>
      </div>
      
      {/* Add Crypto Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="add-crypto-modal">
            <div className="modal-header">
              <h3>Add Custom Cryptocurrency</h3>
              <button className="close-modal-btn" onClick={handleCloseModal}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleAddCrypto}>
              <div className="form-group">
                <label htmlFor="crypto-name">Name*</label>
                <input 
                  id="crypto-name"
                  type="text" 
                  name="name"
                  value={newCrypto.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Bitcoin"
                  required
                  autoFocus
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="crypto-symbol">Symbol*</label>
                <input 
                  id="crypto-symbol"
                  type="text" 
                  name="symbol"
                  value={newCrypto.symbol}
                  onChange={handleInputChange}
                  placeholder="e.g. BTC"
                  maxLength="10"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="crypto-price">Current Price*</label>
                <input 
                  id="crypto-price"
                  type="number" 
                  name="price"
                  value={newCrypto.price}
                  onChange={handleInputChange}
                  placeholder="e.g. 50000"
                  step="0.000001"
                  min="0"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="crypto-change">24h Change (%)</label>
                <input 
                  id="crypto-change"
                  type="number" 
                  name="change24h"
                  value={newCrypto.change24h}
                  onChange={handleInputChange}
                  placeholder="e.g. 5.2"
                  step="0.01"
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Cryptocurrency
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;