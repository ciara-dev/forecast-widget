# @myradar/forecast-widget

A React weather forecast widget powered by the MyRadar API.

## Install

```bash
npm install @myradar/forecast-widget
```

`react` and `react-dom` (v18+) are peer dependencies — they're expected to already be in your app.

## Usage

```tsx
import { WeatherWidget } from "@myradar/forecast-widget";

export default function App() {
  return (
    <WeatherWidget
      lat={40.7128}
      lon={-74.006}
      type="daily"
      duration={7}
      apikey="YOUR_MYRADAR_KEY"
    />
  );
}
```

Styles are bundled and injected automatically — no separate CSS import needed.

### Props

| Prop       | Type                    | Required | Default      | Notes                                              |
| ---------- | ----------------------- | -------- | ------------ | -------------------------------------------------- |
| `lat`      | `number`                | no\*     | `40.7128`    | Latitude                                           |
| `lon`      | `number`                | no\*     | `-74.006`    | Longitude                                          |
| `apikey`   | `string`                | **yes**  | —            | MyRadar subscription key                           |
| `type`     | `"daily" \| "hourly"`   | no       | `"daily"`    | Forecast granularity                               |
| `duration` | `number`                | no       | `7` / `6`    | Daily: `3`, `5`, `7`. Hourly: `6`, `12`            |

\* When a prop is omitted, the widget falls back to the matching URL query
param (`?lat=&lon=&type=&days=/hours=&apiKey=`), which keeps the standalone /
iframe embedding working from the same build.

## Building the library

```bash
npm run build:lib   # outputs dist/ (ESM + CJS + .d.ts)
```

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
