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
const { createStockIndex, indicesUS } = require("../models/indexModel");

//map country to indices
//Google Finance uses three regions - "americas", "europe-middle-east-africa", and "asia-pacific"
const countryToRegionMap = {
  US: indicesUS,
  //add more countries here
};

/**
 * @param {string} country Country from which to scrape indices
 * @returns {Promise<Array>}  An array of the country's indices
 */
async function scrapeIndicesByCountry(region, country) {
  //map country to region
  const indices = countryToRegionMap[country];
  if (!indices) {
    throw new Error(`No indices found for country: ${country}`);
  }
  //build url
  const url = "https://www.google.com/finance/markets/indexes/" + region;
  //fetch data
  const { data } = await axios.get(url);
  //load data into cheerio
  const $ = cheerio.load(data);
  //arrays to store data
  const stockIndex = [];
  const indexNames = [];
  const scores = [];
  const changes = [];
  const percentageChanges = [];

  //scrape names, scores, changes, and percentage changes
  $(".ZvmM7").each(function (i, element) {
    const indexName = $(element).text();
    if (indices.includes(indexName)) {
      indexNames.push(indexName);
      scores.push($(".xVyTdb .YMlKec ").eq(i).text());
      changes.push($(".xVyTdb .SEGxAb .P2Luy").eq(i).text());
      const change = parseFloat($(".xVyTdb .SEGxAb .P2Luy").eq(i).text());
      if (change > 0) {
      percentageChanges.push("+" + $(".xVyTdb .JwB6zf").eq(i).text());
      } else if (change < 0) {
      percentageChanges.push("-" + $(".xVyTdb .JwB6zf").eq(i).text());
      } else {
      percentageChanges.push($(".xVyTdb .JwB6zf").eq(i).text());
      }
    }
  });

  for (let i = 0; i < indexNames.length; i++) {
    stockIndex.push(
      createStockIndex(
        indexNames[i],
        scores[i],
        changes[i],
        percentageChanges[i]
      )
    );
  }

  return stockIndex;
}

module.exports = scrapeIndicesByCountry;
