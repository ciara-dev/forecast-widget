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
| `lat`      | `number`                | no       | `40.7128`    | Latitude                                           |
| `lon`      | `number`                | no       | `-74.006`    | Longitude                                          |
| `apikey`   | `string`                | **yes**  | —            | MyRadar subscription key                           |
| `type`     | `"daily" \| "hourly"`   | no       | `"daily"`    | Forecast granularity                               |
| `duration` | `number`                | no       | `7` / `6`    | Daily: `3`, `5`, `7`. Hourly: `6`, `12`            |
