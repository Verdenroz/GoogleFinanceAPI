/* eslint-disable require-jsdoc */
const axios = require("axios");
const cheerio = require("cheerio");
const { createNewsModel } = require("../models/newsModel");

/**
 * Scrapes the most active stocks from the Google Finance website.
 * @see {@link createNewsModel}
 * @returns {Promise<Array>} - An array of news articles.
 */
async function scrapeNews(symbol, exchange) {
  const url = `https://www.google.com/finance/quote/${symbol}:${exchange}`;
  const data = await axios.get(url);
  const $ = cheerio.load(data.data);
  const headlines = [];
  const images = [];
  const sources = [];
  const urls = [];
  const news = [];

  //scrapes images
  $("img.tLGtv").each(function (i, element) {
    const image = $(element).attr("src");
    images.push(image);
  });

  //scrapes headlines
  $("a.TxRU9d .F2KAFc").each(function (i, element) {
    const headline = $(element).text();
    headlines.push(headline);
    //breaks loop if same length as images array to stop scraping articles with no images
    if (headlines.length === images.length) {
        return false;
    }
  });

  //scrapes sources
  $("a.TxRU9d .AYBNIb").each(function (i, element) {
    const source = $(element).text();
    sources.push(source);
    //breaks loop if same length as images array to stop scraping articles with no images
    if (sources.length === images.length) {
        return false;
    }
  });

  //scrapes urls
  $("a.TxRU9d").each(function (i, element) {
    const url = $(element).attr("href");
    urls.push(url);
    //breaks loop if same length as images array to stop scraping articles with no images
    if (urls.length === images.length) {
        return false;
    }
  });

  for (let i = 0; i < images.length; i++) {
    news.push(createNewsModel(headlines[i], images[i], sources[i], urls[i]));
  }
  return news;
}

module.exports = { scrapeNews };
