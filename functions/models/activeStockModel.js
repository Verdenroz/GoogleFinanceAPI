/**
 * The JSON format of active stocks.
 * @param {string} symbol - The stock symbol.
 * @param {string} name - The stock name.
 * @param {number} current - The current value of the stock.
 * @param {number} change - The change in the stock value.
 * @param {number} percentChange - The percentage change in the stock value.
 */
function createActiveStockModel(
    symbol,
    name,
    current,
    change,
    percentChange
) {
    return {
        symbol,
        name,
        current,
        change,
        percentChange
    }
}

module.exports = { createActiveStockModel };