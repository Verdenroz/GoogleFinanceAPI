/**
 * Creates json model for stock index
 * @param name Name of index
 * @param score Current value of index
 * @param change Change in value of index
 * @param percentChange Percentage change in value of index
 * @returns {Object} JSON model for stock index
 */
function createStockIndex(name, score, change, percentChange) {
    return {
      stockIndex: {
        name: name,
        score: score,
        change, change,
        percentChange: percentChange
      }
    };
  }

  /**
   * Array of indices for the U.S. stock market
   */
  const indices = [
    'S&P 500',
    'Dow Jones Industrial Average',
    'Nasdaq Composite',
    'Russell 2000 Index',
    'S&P/TSX Composite Index',
  ];
  
  module.exports = { createStockIndex, indices };