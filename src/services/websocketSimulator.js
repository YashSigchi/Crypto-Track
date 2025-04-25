// src/services/websocketSimulator.js
import { updateAssetPrices, updateMarketStats } from '../redux/cryptoSlice';

class WebSocketSimulator {
  constructor(store) {
    this.store = store;
    this.priceInterval = null;
    this.statsInterval = null;
  }

  connect() {
    // Update crypto prices every 1.5 seconds
    this.priceInterval = setInterval(() => {
      const assets = this.store.getState().crypto.assets;
      const updates = assets.map(asset => {
        // Generate random price fluctuations
        const priceChange = asset.price * (Math.random() * 0.01 - 0.005); // -0.5% to +0.5%
        const newPrice = parseFloat((asset.price + priceChange).toFixed(2));
        
        // Generate random percentage changes
        const priceChange1h = parseFloat((asset.priceChange1h + (Math.random() * 0.1 - 0.05)).toFixed(2));
        const priceChange24h = parseFloat((asset.priceChange24h + (Math.random() * 0.15 - 0.075)).toFixed(2));
        const priceChange7d = parseFloat((asset.priceChange7d + (Math.random() * 0.2 - 0.1)).toFixed(2));
        
        // Update 24h volume
        const volumeChange = asset.volume24h * (Math.random() * 0.02 - 0.01); // -1% to +1%
        const volume24h = parseFloat((asset.volume24h + volumeChange).toFixed(2));
        const volumeInCrypto = parseFloat((volume24h / newPrice).toFixed(2));
        
        return {
          symbol: asset.symbol,
          price: newPrice,
          priceChange1h,
          priceChange24h,
          priceChange7d,
          volume24h,
          volumeInCrypto,
        };
      });
      
      this.store.dispatch(updateAssetPrices({ updates }));
    }, 1500);
    
    // Update market stats every 30 seconds
    this.statsInterval = setInterval(() => {
      this.store.dispatch(updateMarketStats());
    }, 30000);
  }

  disconnect() {
    if (this.priceInterval) {
      clearInterval(this.priceInterval);
      this.priceInterval = null;
    }
    
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
      this.statsInterval = null;
    }
  }
}

export default WebSocketSimulator;