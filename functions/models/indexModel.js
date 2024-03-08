/*
 * MIT License
 * Copyright (c) 2024 Harvey
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
  ];
  
  module.exports = { createStockIndex, indices };