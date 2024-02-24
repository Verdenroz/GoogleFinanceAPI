const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { createStockIndex, indices } = require('./indexModel');
const scrapeIndices = require('./scraper');

const app = express();
const port = 3000;

app.get('/us/indices', async (req, res) => {
  try {
    const stockIndex = await scrapeIndices();
    res.status(200).json(stockIndex);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `An error occurred while scraping the website: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});