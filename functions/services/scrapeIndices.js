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

/* eslint-disable require-jsdoc */
const axios = require("axios");
const cheerio = require("cheerio");
const {createStockIndex, indices} = require("../models/indexModel");

async function scrapeIndices() {
  /**
   * Google Finance URL for market indices
   */
  const url = "https://www.google.com/finance/markets/indexes";
  /**
   * Fetch the data from the URL
   */
  const {data} = await axios.get(url);
  /**
   * Load the data into cheerio
   */
  const $ = cheerio.load(data);
  /**
   * Extracts names from HTML
   */
  const indexNames = $(".Q8lakc .ZvmM7").text();
  /**
   * Extracts current value of indices from HTML
   */
  const scores = $(".xVyTdb .YMlKec").text().replace(/,/g, "").match(/\d+\.\d{2}/g).map(parseFloat).slice(0, indices.length);
  /**
   * Extracts change in value of indices from HTML
   */
  const change = $(".xVyTdb .SEGxAb .P2Luy").text().match(/[-+]\d+\.\d{2}/g).map(parseFloat).slice(0, indices.length);
  /**
   * Extracts percentage change in value of indices from HTML
   */
  const percentageChange = $(".xVyTdb .JwB6zf").text().match(/\d+\.\d+%?/g).slice(0, indices.length);

  let startIndex = 0;
  let endIndex = 0;
  /**
   * Create an array of stock indices
   */
  const stockIndex = [];

  /**
   * Loop through the indices and create an array of stock indices
   */
  for (let i = 0; i < indices.length; i++) {
    endIndex = startIndex + indices[i].length;
    if (change[i] < 0) {
      change[i] = `-${change[i]}`;
      percentageChange[i] = `-${percentageChange[i]}`;
    }
    else{
      change[i] = `+${change[i]}`;
      percentageChange[i] = `+${percentageChange[i]}`;
    
    }
    const index = createStockIndex(indexNames.substring(startIndex, endIndex), scores[i], change[i], percentageChange[i]);
    stockIndex.push(index);
    startIndex = endIndex;
  }

  return stockIndex;
}

module.exports = scrapeIndices;
