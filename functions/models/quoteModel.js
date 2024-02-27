/**
 * Creates a full stock quote object.
 * @param {string} name - The name of the stock.
 * @param {string} symbol - The symbol of the stock.
 * @param {string} exchange - The exchange where the stock is traded.
 * @param {number} previousClose - The previous closing price of the stock.
 * @param {number} current - The current price of the stock.
 * @param {number} open - The opening price of the stock.
 * @param {number} high - The highest price of the stock for the day.
 * @param {number} low - The lowest price of the stock for the day.
 * @param {number} avgVolume - The average trading volume of the stock.
 * @param {number} marketCap - The market capitalization of the stock.
 * @param {number} peRatio - The price-to-earnings ratio of the stock.
 * @param {number} week52High - The highest price of the stock in the past 52 weeks.
 * @param {number} week52Low - The lowest price of the stock in the past 52 weeks.
 * @param {number} ytdChange - The year-to-date change in the stock price.
 * @param {number} dividendYield - The dividend yield of the stock.
 * @param {number} change - The change in the stock price.
 * @param {number} percentChange - The percentage change in the stock price.
 * @param {string} about - Information about the stock.
 * @param {string} ceo - The CEO of the company.
 * @param {string} summary - A summary of the stock.
 * @param {number} employees - The number of employees in the company.
 * @param {string} website - The website of the company.
 * @param {number} quarterlyRevenue - The quarterly revenue of the company.
 * @param {number} annualRevenue - The annual revenue of the company.
 * @param {number} quarterlyNetIncome - The quarterly net income of the company.
 * @param {number} annualNetIncome - The annual net income of the company.
 * @param {number} eps - The earnings per share of the company.
 * @returns {object} The full stock quote object with all the details.
 */
function createFullStockQuote(
    name,
    symbol,
    exchange,
    previousClose,
    current,
    open,
    high,
    low,
    avgVolume,
    marketCap,
    peRatio,
    week52High,
    week52Low,
    ytdChange,
    dividendYield,
    change,
    percentChange,
    about,
    ceo,
    summary,
    employees,
    website,
    quarterlyRevenue,
    annualRevenue,
    quarterlyNetIncome,
    annualNetIncome,
    eps,
    news
) {
    return {
        name,
        symbol,
        exchange,
        previousClose,
        current,
        open,
        high,
        low,
        avgVolume,
        marketCap,
        peRatio,
        week52High,
        week52Low,
        ytdChange,
        dividendYield,
        change,
        percentChange,
        about,
        ceo,
        summary,
        employees,
        website,
        quarterlyRevenue,
        annualRevenue,
        quarterlyNetIncome,
        annualNetIncome,
        eps,
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
