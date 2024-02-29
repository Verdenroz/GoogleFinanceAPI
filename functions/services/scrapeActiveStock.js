/* eslint-disable require-jsdoc */
const axios = require("axios");
const cheerio = require("cheerio");
const {createStockModel} = require("../models/stockModel")

/**
 * Scrapes the most active stocks from the Google Finance website.
 * @see {@link createStockModel}
 * @see https://www.google.com/finance/markets/most-active
 * @returns {Promise<Array>} - An array of active stocks.
 */
async function scrapeActiveStock(){
    const url = "https://www.google.com/finance/markets/most-active";
    const data = await axios.get(url);
    const $ = cheerio.load(data.data);
    const activeStocks = [];
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
        const percentChange = $(element).text();
        percentChanges.push(percentChange);
    });
    //creates active stock model for each
    for (let i = 0; i < symbols.length; i++) {
        activeStocks.push(createStockModel(
            symbols[i],
            names[i],
            values[i],
            changes[i],
            percentChanges[i]
        ));
    }
    return activeStocks;

}

module.exports = {scrapeActiveStock};