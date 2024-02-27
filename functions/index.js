
const {onRequest} = require("firebase-functions/v2/https");
const express = require("express");
const scrapeIndices = require("./services/scrapeIndices");

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

app.get("/search", (req, res) => {
  const { symbol, exchange } = req.query;
  try{
    if (!symbol || !exchange) {
      res.status(400).json({
        error: "Please provide both symbol and exchange query parameters",
      });
      return;
    }
    res.status(200).json({
      symbol: symbol,
      exchange: exchange,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while searching for the stock: " + error.message,
    });
  }
});

app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});

exports.app = onRequest(app);
