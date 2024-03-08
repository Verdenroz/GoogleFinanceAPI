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
 * Creates a full stock quote object.
 * @param {string} name - The name of the stock.
 * @param {string} symbol - The symbol of the stock.
 * @param {string} exchange - The exchange where the stock is traded.
 * @param {number} previousClose - The previous closing price of the stock.
 * @param {number} change - The change in value of the stock.
 * @param {number} percentChange - The percentage change in the stock price.
 * @param {number} current - The current price of the stock.
 * @param {number} aftermarketValue - The aftermarket value of the stock. Null if market is closed.
 * @param {number} high - The highest price of the stock for the day.
 * @param {number} low - The lowest price of the stock for the day.
 * @param {number} avgVolume - The average trading volume of the stock.
 * @param {number} marketCap - The market capitalization of the stock.
 * @param {number} peRatio - The price-to-earnings ratio of the stock.
 * @param {number} week52High - The highest price of the stock in the past 52 weeks.
 * @param {number} week52Low - The lowest price of the stock in the past 52 weeks.
 * @param {number} dividendYield - The dividend yield of the stock.
 * @param {number} change - The change in the stock price.
 * @param {number} percentChange - The percentage change in the stock price.
 * @param {string} about - Information about the stock.
 * @param {number} employees - The number of employees in the company.
 * @param {string} quarter - The quarter of the income statements.
 * @param {number} quarterlyRevenue - The quarterly revenue of the company.
 * @param {number} quarterlyNetIncome - The quarterly net income of the company.
 * @param {number} quarterlyEPS - The earnings per share of the company.
 * @returns {object} The full stock quote object with all the details.
 */
function createFullStockQuote(
    name,
    symbol,
    exchange,
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
    quarterlyEPS,
) {
    return {  
        name,
        symbol,
        exchange,
        previousClose,
        change,
        aftermarketValue,
        percentChange,
        current,
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
        quarterlyEPS,
    };
}
/**
 * Creates a simple stock quote object.
 * @param {string} name - The name of the stock.
 * @param {string} symbol - The symbol of the stock.
 * @param {string} exchange - The exchange where the stock is traded.
 * @param {number} current - The current price of the stock.
 * @returns {object} The simple stock quote object with the basic details.
 */
function createSimpleQuote(
    name,
    symbol,
    exchange,
    current,
) {
    return {
        name,
        symbol,
        exchange,
        current
    };
}

module.exports = {createFullStockQuote, createSimpleQuote};
