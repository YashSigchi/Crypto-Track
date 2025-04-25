// src/redux/cryptoSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { initialCryptoData } from '../data/initialData';

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    assets: initialCryptoData,
    marketStats: {
      totalMarketCap: 2.58,
      totalMarketCapChange: 2.4,
      volume24h: 182.54,
      volumeChange: -1.2,
      btcDominance: 5.6,
      btcDominanceChange: 0.3,
      totalCryptocurrencies: 10483,
      newCryptos: 12,
      lastUpdated: new Date().toLocaleTimeString('en-US', { hour12: false })
    },
    filter: {
      search: '',
      sortBy: 'marketCapDesc',
      filterBy: 'all',
      currency: 'USD',
      page: 1,
      itemsPerPage: 6
    },
    isLightMode: true,
    loading: false,
    error: null
  },
  reducers: {
    updateAssetPrices: (state, action) => {
      const { updates } = action.payload;
      updates.forEach(update => {
        const asset = state.assets.find(a => a.symbol === update.symbol);
        if (asset) {
          asset.price = update.price;
          asset.priceChange1h = update.priceChange1h;
          asset.priceChange24h = update.priceChange24h;
          asset.priceChange7d = update.priceChange7d;
          asset.volume24h = update.volume24h;
          asset.volumeInCrypto = update.volumeInCrypto;
          asset.chartData = [...asset.chartData.slice(1), update.price];
        }
      });
    },
    updateMarketStats: (state) => {
      // Update volume - convert to number first, then add random value, then format
      state.marketStats.volume24h = (parseFloat(state.marketStats.volume24h) + (Math.random() * 0.4 - 0.2)).toFixed(2);
      
      // Update last updated time
      state.marketStats.lastUpdated = new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },
    addCustomCrypto: (state, action) => {
      // Get the custom crypto data from the action payload
      const customCrypto = action.payload;
      
      // Generate fake chart data for visualization
      const basePrice = customCrypto.price;
      const fakeChartData = Array(24).fill(0).map(() => 
        basePrice * (1 + (Math.random() * 0.1 - 0.05))
      );
      
      // Add additional properties to make it compatible with the rest of the app
      const completeCrypto = {
        ...customCrypto,
        priceChange1h: customCrypto.change24h / 24 || 0, // Approximate hourly change
        priceChange24h: customCrypto.change24h || 0,
        priceChange7d: customCrypto.change24h * 3 || 0, // Fake 7d change
        volume24h: basePrice * 1000, // Fake volume
        volumeInCrypto: (basePrice * 1000) / basePrice, // Simple conversion
        marketCap: basePrice * 1000000, // Fake market cap
        totalSupply: 1000000,
        circulatingSupply: 800000,
        chartData: fakeChartData,
        rank: state.assets.length + 1,
      };
      
      // Add the new cryptocurrency to the assets array
      state.assets.push(completeCrypto);
      
      // Update the total count of cryptocurrencies in market stats
      state.marketStats.totalCryptocurrencies += 1;
      state.marketStats.newCryptos += 1;
    },
    setSearchTerm: (state, action) => {
      state.filter.search = action.payload;
      state.filter.page = 1; // Reset to first page when searching
    },
    setSortBy: (state, action) => {
      state.filter.sortBy = action.payload;
    },
    setFilterBy: (state, action) => {
      state.filter.filterBy = action.payload;
    },
    setCurrency: (state, action) => {
      state.filter.currency = action.payload;
    },
    setPage: (state, action) => {
      state.filter.page = action.payload;
    },
    toggleTheme: (state) => {
      state.isLightMode = !state.isLightMode;
    }
  }
});

export const {
  updateAssetPrices,
  updateMarketStats,
  addCustomCrypto,
  setSearchTerm,
  setSortBy,
  setFilterBy,
  setCurrency,
  setPage,
  toggleTheme
} = cryptoSlice.actions;

// Selectors
export const selectAllAssets = state => state.crypto.assets;
export const selectMarketStats = state => state.crypto.marketStats;
export const selectTheme = state => state.crypto.isLightMode;
export const selectFilterOptions = state => state.crypto.filter;

// Filtered and sorted assets selector
export const selectFilteredAndSortedAssets = state => {
  const { assets } = state.crypto;
  const { search, sortBy, filterBy, page, itemsPerPage } = state.crypto.filter;
  
  // Step 1: Filter by search term
  let filtered = assets;
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(asset => 
      asset.name.toLowerCase().includes(searchLower) || 
      asset.symbol.toLowerCase().includes(searchLower)
    );
  }
  
  // Step 2: Apply category filter
  if (filterBy === 'gainers') {
    filtered = filtered.filter(asset => asset.priceChange24h > 0);
  } else if (filterBy === 'losers') {
    filtered = filtered.filter(asset => asset.priceChange24h < 0);
  }
  
  // Step 3: Sort the assets
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'marketCapDesc':
        return b.marketCap - a.marketCap;
      case 'marketCapAsc':
        return a.marketCap - b.marketCap;
      case 'priceDesc':
        return b.price - a.price;
      case 'priceAsc':
        return a.price - b.price;
      case 'change24hDesc':
        return b.priceChange24h - a.priceChange24h;
      case 'change24hAsc':
        return a.priceChange24h - b.priceChange24h;
      default:
        return 0;
    }
  });
  
  // Step 4: Paginate
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedAssets = sorted.slice(startIndex, startIndex + itemsPerPage);
  
  return {
    assets: paginatedAssets,
    totalCount: sorted.length,
    totalPages: Math.ceil(sorted.length / itemsPerPage)
  };
};

export default cryptoSlice.reducer;

