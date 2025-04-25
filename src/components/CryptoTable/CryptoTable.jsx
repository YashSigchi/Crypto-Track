// src/components/CryptoTable/CryptoTable.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredAndSortedAssets } from '../../redux/cryptoSlice';
import CryptoRow from './CryptoRow';
import FilterControls from './FilterControls';
import Pagination from '../Pagination/Pagination';
import { FiInfo } from 'react-icons/fi';
import './CryptoTable.css';

const CryptoTable = () => {
  const { assets, totalCount } = useSelector(selectFilteredAndSortedAssets);
  
  return (
    <div className="crypto-table-container">
      <FilterControls />
      
      <div className="table-responsive">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>1h %</th>
              <th>24h %</th>
              <th>7d %</th>
              <th>
                Market Cap
                <FiInfo className="info-icon" />
              </th>
              <th>
                Volume (24h)
                <FiInfo className="info-icon" />
              </th>
              <th>
                Circulating Supply
                <FiInfo className="info-icon" />
              </th>
              <th>Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <CryptoRow key={asset.symbol} asset={asset} rank={asset.id} />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-footer">
        <div className="showing-info">
          Showing {assets.length} out of {totalCount} cryptocurrencies
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default CryptoTable;