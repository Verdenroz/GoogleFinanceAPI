/**
 * Creates a json model for news articles of a stock
 * @param {string} headline Headline of news article
 * @param {string} image Image of news article
 * @param {string} source Source of news article
 * @param {string} url URL of news article
 * @returns {object} The news article object with related details
 */
function createNewsModel(
    headline, 
    image,
    source,
    url
){
    return {
        headline: headline,
        image: image,
        source: source,
        url: url
    };
}

module.exports = {createNewsModel};