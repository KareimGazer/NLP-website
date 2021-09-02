# NLP-website
a website that allows users to run NLP on articles and blogs

The starte template is from [frontend-nanodegree-starter](https://github.com/udacity/fend-webpack-content).

## Getting Started
To get started:

* install all project dependencies with `npm install`
* build with `npm run build-prod`
* start server with `npm run start`
* opne `dist/index.html`
* type the url of your choice in the form input to bring you detailed analsis of the page in question.

## backend
The backend uses MeaningCloud [Sentiment Analysis API](https://www.meaningcloud.com/developer/sentiment-analysis) and run using Nodejs and Expresss.

## Build Tool
This project was build with [Webpack V5](https://github.com/webpack/webpack). You can find more information about loaders and installed packages in `package.json` file in the root directory

## Testing
Testing was done with [Jest](https://github.com/facebook/jest). Test modules can be found at `__test__` folder in the root directory.
