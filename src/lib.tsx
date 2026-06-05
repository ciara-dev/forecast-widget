// Public entry point for the published npm package.
// Importing the CSS here lets the bundler inline it into the JS (auto-injected
// at runtime) so consumers only need to import the component.
import "./styles/widget.css";

export { default as WeatherWidget } from "./widget/WeatherWidget";
export type { WeatherWidgetProps } from "./widget/WeatherWidget";
