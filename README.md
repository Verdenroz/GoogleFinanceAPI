# Google Finance API

The Google Finance API is a tool that provides financial data, including stock indices, quotes, active stocks, gainers, losers, and news. It's built with Node.js and Express, and uses web scraping to gather data from Google Finance.

## Documentation

For more detailed information about the API, including request parameters and response formats, please visit the

[API documentation site](https://gfinance-api-doc.web.app/).

## API Endpoints

The API provides the following endpoints:

- `/indices/:region?country?`: Get stock indices by a region. Optionally, specify a country with the `country` parameter.
- `/fullQuote/:symbol?exchange?`: Get full quote for a specific stock symbol and its exchange.
- `/quote/:symbol?exchange?`: Get a simple quote for a specific stock symbol and its echange.
- `/active`: Get the stocks or funds with the highest trading volume (in shares) during the current trading session
- `/gainers`: The top gaining stocks or funds (by percent change) during the current trading session
- `/losers`: The top losing stocks or funds (by percent change) during the current trading session
- `/news:symbol?:exchange?`: Get financial news related to a stock

## Rate Limiting

Please note that the API uses rate limiting to prevent abuse and ensure fair usage. Each client can make 10 requests per minute. If the rate limit is exceeded, the API will respond with a 429 status code.
If you would like to use the API for yourself, you will have to fork this repo and create your own X-API-Key as an environment variable in a .env file,deploy the project to your own firebase project.

## Deploy to Firebase

Firebase deploys my functions directory as a cloud function and hosts my docs directory. If you are forking my repo, create your own Firebase project and download the [Firebase CLI](https://firebase.google.com/docs/cli/). 
Initialize firebase with `firebase init` and choose your project. Ensure that your .firebaserc and firebase.json match your project details

### Recommended Resources

- [Firebase Hosting](https://youtu.be/5n1-wQFoZtU?si=M8qkJyTWvr8cE-T8)
- [Firebase Cloud Functions](https://youtu.be/LW26kpjGl2c?si=f4dKzsUJSc7zzuK4)

