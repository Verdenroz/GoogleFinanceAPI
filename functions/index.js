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
require('dotenv').config();
const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const rateLimit = require("express-rate-limit");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const swaggerUi = require("swagger-ui-express");
const scrapeIndices = require("./services/scrapeIndices");
const scrapeIndicesByCountry = require("./services/scrapeIndicesByCountry");
const cors = require('cors');
const {scrapeFullQuote, scrapeSimpleQuote,} = require("./services/scrapeQuote");
const { scrapeActiveStock } = require("./services/scrapeActiveStock");
const { scrapeGainers } = require("./services/scrapeGainers");
const { scrapeLosers } = require("./services/scrapeLosers");
const { scrapeNews } = require("./services/scrapeNews");

const app = express();
const port = 3000;

corsOptions = {
  origin: [process.env.ORIGIN, "http://localhost:3000", "https://gfinance-api-doc.web.app", "https://gfinance-api-doc.firebaseapp.com"],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const demoApiKey = "demo";
//limits demo key to 10 requests a minute
const demoApiLimiter = rateLimit({
  windowMs: 60000,
  max: 10,
  message: "Too many requests from this IP, please try again after a minute"
});

app.use((req, res, next) => {
  let apiKey = req.get('X-API-Key');
  if (!apiKey) {
    apiKey = demoApiKey;
    req.headers['x-api-key'] = demoApiKey;
    demoApiLimiter(req, res, next);
  } else if (apiKey === process.env.API_KEY) {
    next();
  } else {
    demoApiLimiter(req, res, next);
  }
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/indices", async (req, res) => {
  const { region, country} = req.query;
  if (!region) {
    res.status(400).json({
      error: "Please provide region query parameter (americas, europe-middle-east-africa, or asia-pacific)",
    });
    return;
  }
  try {
    let stockIndex;
    if (country) {
      stockIndex = await scrapeIndicesByCountry(region, country);
    } else {
      stockIndex = await scrapeIndices(region);
    }
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
  try {
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
      error:
        "An error occurred while searching for the stock: " + error.message,
    });
  }
});

app.get("/quote", async (req, res) => {
  const { symbol, exchange } = req.query;
  try {
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

app.get("/news", async (req, res) => {
  const { symbol, exchange } = req.query;
  try {
    if (!symbol || !exchange) {
      res.status(400).json({
        error: "Please provide both symbol and exchange query parameters",
      });
      return;
    }
    const news = await scrapeNews(symbol, exchange);
    res.status(200).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "An error occurred while searching for the stock: " + error.message,
    });
  }
});

app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});

exports.app = onRequest(app);
