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
const { createStockIndex } = require("../models/indexModel");
/**
 * 
 * @param {string} region Either "americas", "europe-middle-east-africa", or "asia-pacific"
 * @returns {Promise<Array>}  An array of the region's indices
 */
async function scrapeIndices(region) {
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

  //scrape names
  $(".ZvmM7").each(function (i, element) {
    indexNames.push($(element).text());
  });

  //scrape scores (current index value)
  $(".xVyTdb .YMlKec ").each(function (i, element) {
    scores.push($(element).text());
  });

  //scrape changes
  $(".xVyTdb .SEGxAb .P2Luy").each(function (i, element) {
    changes.push($(element).text());
  });

  //scrape percentage changes
  $(".xVyTdb .JwB6zf").each(function (i, element) {
    percentageChanges.push($(element).text());
  });

  for(let i = 0; i < indexNames.length; i++) {
    stockIndex.push(createStockIndex(indexNames[i], scores[i], changes[i], percentageChanges[i]));
  }

  return stockIndex;
}

module.exports = scrapeIndices;
