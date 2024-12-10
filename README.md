>[!IMPORTANT]
>**🚨 Notice: Project No Longer Maintained 🚨**
>
>As of **Dec 9, 2024**, this project is no longer maintained by the original developers. No further updates, bug fixes, or support will be provided. (Though honestly it has been unofficially dead for months already)
>
>- **Pull Requests and Issues**: I will not be reviewing or merging pull requests, nor responding to issues or discussions.
>
>- **Forking and Future Development**: In accordance with the [MIT License](LICENSE), you are encouraged to **fork this repository** to continue development independently. You are free to modify, distribute, and release your own versions under the same license.
>
>- **Disclaimer of Liability**:
>  - **"As-Is" Basis**: This software is provided on an "as-is" basis without any warranties or conditions of any kind, either express or implied.
>  - **No Liability**: The original maintainers shall not be liable for any claims, damages, or other liabilities arising from the use, modification, or distribution of this software.
>  - **User Responsibility**: Users and developers who choose to use or fork this project assume all risks and responsibilities associated with its use and further development.
>
>For more information, please refer to the [LICENSE](LICENSE) file.
>
>![License](https://img.shields.io/badge/license-MIT-blue.svg?style=plastic)
[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)


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

