
const {onRequest} = require("firebase-functions/v2/https");
const express = require("express");
const scrapeIndices = require("./services/scrapeIndices");
const {scrapeFullQuote, scrapeSimpleQuote} = require("./services/scrapeQuote");
const {scrapeActiveStock} = require("./services/scrapeActiveStock");
const {scrapeGainers} = require("./services/scrapeGainers");
const {scrapeLosers} = require("./services/scrapeLosers");

const app = express();
const port = 3000;

app.get("/us/indices", async (req, res) => {
  try {
    const stockIndex = await scrapeIndices();
    res.status(200).json(stockIndex);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while scraping the website: " + error.message,
    });
  }
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
app.get("/fullQuote", async (req, res) => {
  const { symbol, exchange } = req.query;
  try{
    if (!symbol || !exchange) {
      res.status(400).json({
        error: "Please provide both symbol and exchange query parameters",
      });
      return;
    }
    const fullQuote = await scrapeFullQuote(symbol, exchange);
    res.status(200).json(fullQuote);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while searching for the stock: " + error.message,
    });
  }
});

app.get("/quote", async (req, res) => {
  const { symbol, exchange } = req.query;
  try{
    if (!symbol || !exchange) {
      res.status(400).json({
        error: "Please provide both symbol and exchange query parameters",
      });
      return;
    }
    const fullQuote = await scrapeSimpleQuote(symbol, exchange);
    res.status(200).json(fullQuote);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while searching for the stock: " + error.message,
    });
  }
});

app.get("/active", async (req, res) => {
  try {
    const activeStocks = await scrapeActiveStock();
    res.status(200).json(activeStocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while scraping the website: " + error.message,
    });
  }
});

app.get("/gainers", async (req, res) => {
  try {
    const gainers = await scrapeGainers();
    res.status(200).json(gainers);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while scraping the website: " + error.message,
    });
  }
});

app.get("/losers", async (req, res) => {
  try {
    const losers = await scrapeLosers();
    res.status(200).json(losers);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while scraping the website: " + error.message,
    });
  }
});

app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});

exports.app = onRequest(app);
