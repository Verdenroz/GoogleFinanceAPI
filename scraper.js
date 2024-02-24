const axios = require('axios');
const cheerio = require('cheerio');
const { createStockIndex, indices } = require('./indexModel');

async function scrapeIndices() {
    const url = 'https://www.google.com/finance/markets/indexes';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
  
    const indexNames = $('.Q8lakc .ZvmM7').text();
    const scores = $('.xVyTdb .YMlKec').text().replace(/,/g, "").match(/\d+\.\d{2}/g).map(parseFloat).slice(0, indices.length);
    const change = $('.xVyTdb .SEGxAb .P2Luy').text().match(/[-+]\d+\.\d{2}/g).map(parseFloat).slice(0, indices.length);
    const percentageChange = $('.xVyTdb .JwB6zf').text().match(/\d+\.\d+%?/g).slice(0, indices.length);
  
    let startIndex = 0;
    let endIndex = 0;
    let stockIndex = [];
  
    for (let i = 0; i < indices.length; i++) {
      endIndex = startIndex + indices[i].length;
      if (change[i] < 0) {
        percentageChange[i] = `-${percentageChange[i]}`;
      }
      let index = createStockIndex(indexNames.substring(startIndex, endIndex), scores[i], change[i], percentageChange[i]);
      stockIndex.push(index)
      startIndex = endIndex;
    }
  
    return stockIndex;
  }

  module.exports = scrapeIndices;