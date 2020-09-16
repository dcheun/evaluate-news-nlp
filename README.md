# Evaluate News NLP

evaluate-news-nlp is a web application that takes a news article URL as input, applies Natural
Language Processing, and dynamically updates the page to display the results.

The application calls a third party MeaningCloud API to process the NLP semantics.
The results shown include a formatted output in tables, as well as raw JSON output.

This application is hosted on [Heroku](https://dc-eval-news-nlp.herokuapp.com/).

## Usage

Simply enter the URL in the provided text input and click the submit button.

## Project Details

The server is built with Node.js providing a couple HTTP GET routes for data retrieved at the client side js.
The project uses Webpack build tool for asset management and bundling of the project for production deployment.
Included are two configuration files for production and development utilizing Webpack dev server.
Styling is done with Sass. JS and styles are minified for production environment. Finally service
workers are added to show content offline.

### Packages Used

- Node.js, Express, Webpack, Sass, Service Workers, various supporting npm packages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
