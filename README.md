# Welcome the Forecast Widget ⛅🌡️🛰️

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In order to get this project to run you will need to:

### `npm install`

In the parent folder. 

Once you have all the packages installed, go to src/widget/WeatherWidget.tsx and add the MyRadar key (in quotes) to the line:

### const apiKeyParam 

The line should look like this now:

### const apiKeyParam = params.get("apiKey") || {MYRADAR_API_KEY}; 

Now that your project is set up, you can run

### npm start

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

Enjoy👩🏽‍💻☕!
