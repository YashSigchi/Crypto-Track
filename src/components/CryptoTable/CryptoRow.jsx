import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import PriceChange from './PriceChange';
import MiniChart from './MiniChart';
import { formatLargeNumber, formatSupply } from '../../utils/formatters';
import './CryptoRow.css';

const CryptoRow = memo(({ asset, rank }) => {
  const { currency } = useSelector(state => state.crypto.filter);
  const trend = asset.priceChange24h >= 0 ? 'positive' : 'negative';
  
  // Define currency symbols
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥'
  };
  
  const currencySymbol = currencySymbols[currency] || '$';
  
  return (
    <tr className="crypto-row">
      <td className="rank-cell">
        <div className="star-container">
          <span className="star">★</span>
        </div>
        {rank}
      </td>
      
      <td className="name-cell">
        <div className="crypto-icon">
          <img src={asset.logoUrl} alt={asset.name} />
        </div>
        <div className="name-container">
          <span className="crypto-name">{asset.name}</span>
          <span className="crypto-symbol">{asset.symbol}</span>
        </div>
      </td>
      
      <td className="price-cell">
        {currencySymbol}{asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
      
      <td className="change-cell">
        <PriceChange value={asset.priceChange1h} />
      </td>
      
      <td className="change-cell">
        <PriceChange value={asset.priceChange24h} />
      </td>
      
      <td className="change-cell">
        <PriceChange value={asset.priceChange7d} />
      </td>
      
      <td className="market-cap-cell">
        {currencySymbol}{formatLargeNumber(asset.marketCap)}
      </td>
      
      <td className="volume-cell">
        <div className="volume-usd">{currencySymbol}{formatLargeNumber(asset.volume24h)}</div>
        <div className="volume-crypto">
          {asset.volumeInCrypto.toLocaleString()} {asset.symbol}
        </div>
      </td>
      
      <td className="supply-cell">
        <div className="supply-amount">
          {formatSupply(asset.circulatingSupply)} {asset.symbol}
        </div>
        <div className="supply-bar">
          <div className="supply-progress" style={{ width: '50%' }}></div>
        </div>
      </td>
      
      <td className="chart-cell">
        <MiniChart data={asset.chartData} trend={trend} />
      </td>
    </tr>
  );
});

export default CryptoRow;
