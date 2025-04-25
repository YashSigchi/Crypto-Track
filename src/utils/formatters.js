// src/utils/formatters.js
export const formatLargeNumber = (num) => {
  if (num >= 1_000_000_000_000) {
    return `${(num / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  }
  return num.toString();
};

export const formatSupply = (supply) => {
  if (supply >= 1_000_000_000) {
    return `${(supply / 1_000_000_000).toFixed(2)}B`;
  }
  if (supply >= 1_000_000) {
    return `${(supply / 1_000_000).toFixed(2)}M`;
  }
  if (supply >= 1_000) {
    return `${(supply / 1_000).toFixed(2)}K`;
  }
  return supply.toFixed(2);
};