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
const moment = require("moment");
const { createFullStockQuote, createSimpleQuote } = require("../models/quoteModel");

/**
 * Scrapes complex data for a quote from Google Finance.
 *  @param {string} symbol - The stock symbol.
 *  @param {string} exchange - The stock exchange.
 *  @see {@link createFullStockQuote}
 *  @returns {object} The full stock quote object with all the details.
 */

async function scrapeFullQuote(symbol, exchange) {
  const url = `https://www.google.com/finance/quote/${symbol}:${exchange}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const values = $(".YMlKec.fxKbKc").text().replace("$", "").split("$");
  const dataArray = $(".P6K39c").text().split("$");

  const name = $(".zzDege").text();
  const stockSymbol = symbol;
  const primaryExchange = exchange;
  const current = values[0];
  let aftermarketValue = "N/A";
  if (moment().isAfter(moment().hour(16).minute(0).second(0))) {
    aftermarketValue = values[1];
  }
  const previousClose = dataArray[1];
  const change = (current - previousClose).toFixed(2);
  const percentChange = ((change / previousClose) * 100).toFixed(2) + "%";
  const low = dataArray[2].split("-")[0].trim();
  const high = dataArray[3];
  const week52Low = dataArray[4].split("-")[0].trim();
  const week52High = dataArray[5].match(/\d+\.\d{2}/)[0];
  const marketCap = dataArray[5].split(week52High)[1].match(/\d+\.\d{2}(T|B|M) USD/)[0];
  const avgVolume = dataArray[5].match(/\d+\.\d{2}M/)[0];
  const peRatio = dataArray[5].split(avgVolume)[1].match(/\d+\.\d{2}/)[0];
  const dividendYield = dataArray[5].match(/(\b\d+\.\d{2}%\b)/)?.[0]?.substring(2) ?? "N/A";
  const employees = dataArray[5].match(/(\d+,?\d*)$/)[1];
  const about = $(".bLLb2d").text().replace(/\n/g, ' ').replace(/Wikipedia/g, '').trim();
  const quarter = $(".yNnsfe").text().match(/\(USD\)(\w+\s\d{4})/)[1];
  const quarterlyRevenue = $('tr:contains("Revenue") .QXDnM').text();
  const quarterlyNetIncome = $('tr:contains("Net income") .QXDnM').text().match(/(\d+\.\d+)([BM]?)?/g)[0];
  const eps = $('tr:contains("Earnings per share") .QXDnM').text();
  return createFullStockQuote(
    name,
    stockSymbol,
    primaryExchange,
    previousClose,
    change,
    percentChange,
    current,
    aftermarketValue,
    high,
    low,
    avgVolume,
    marketCap,
    peRatio,
    week52High,
    week52Low,
    dividendYield,
    change,
    percentChange,
    about,
    employees,
    quarter,
    quarterlyRevenue,
    quarterlyNetIncome,
    eps
  );
}

/**
 * Scrapes the simple information for a quote from Google Finance.
 * @param {string} symbol - The stock symbol.
 * @param {string} exchange - The stock exchange.
 * @see {@link createSimpleQuote}
 * @returns {object} The simple stock quote object with the current price.
 */
async function scrapeSimpleQuote(symbol, exchange) {
  const url = `https://www.google.com/finance/quote/${symbol}:${exchange}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const name = $(".zzDege").text();
  const stockSymbol = symbol;
  const primaryExchange = exchange;
  const current = $(".YMlKec.fxKbKc").text().replace("$", "").split("$")[0];
  return createSimpleQuote(
    name,
    stockSymbol,
    primaryExchange,
    current
  )
}

module.exports = { scrapeFullQuote, scrapeSimpleQuote };
