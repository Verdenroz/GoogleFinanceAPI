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

  const indices = [
    'S&P 500',
    'Dow Jones Industrial Average',
    'Nasdaq Composite',
    'Russell 2000 Index',
    'S&P/TSX Composite Index',
  ];
  
  module.exports = { createStockIndex, indices };