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
const {createStockModel} = require("../models/stockModel")

/**
 * Scrapes the highest losing stocks from the Google Finance website.
 * @see {@link createStockModel}
 * @see https://www.google.com/finance/markets/losers
 * @returns {Promise<Array>} - An array of the top losing stocks or funds during the current trading session
 */
async function scrapeLosers(){
    const url = "https://www.google.com/finance/markets/losers";
    const data = await axios.get(url);
    const $ = cheerio.load(data.data);
    const losers = [];
    const symbols = [];
    const names = [];
    const values = [];
    const changes = [];
    const percentChanges = [];

    //scrapes symbols
    $(".Sy70mc .COaKTb").each(function(i, element){
        const symbol = $(element).text();
        symbols.push(symbol);
    });
    //scrapes names
    $(".Sy70mc .ZvmM7").each(function(i, element){
        const name = $(element).text();
        names.push(name);
    });
    //scrapes values
    $(".Sy70mc .YMlKec").each(function(i, element){
        const value = $(element).text();
        values.push(value);
    });
    //scrapes changes in value
    $(".Sy70mc .BAftM").each(function(i, element){
        const change = $(element).text();
        changes.push(change);
    });
    //scrapes percent changes
    $(".Sy70mc .JwB6zf").each(function(i, element){
        const percentChange = "-" + $(element).text();
        percentChanges.push(percentChange);
    });
    //creates active stock model for each
    for (let i = 0; i < symbols.length; i++) {
        losers.push(createStockModel(
            symbols[i],
            names[i],
            values[i],
            changes[i],
            percentChanges[i]
        ));
    }
    return losers;

}

module.exports = { scrapeLosers };