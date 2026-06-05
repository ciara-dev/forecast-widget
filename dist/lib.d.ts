import { default as default_2 } from 'react';

export declare const WeatherWidget: default_2.FC<WeatherWidgetProps>;

export declare interface WeatherWidgetProps {
    /** Latitude. Falls back to the `lat` URL param, then New York. */
    lat?: number;
    /** Longitude. Falls back to the `lon` URL param, then New York. */
    lon?: number;
    /** MyRadar subscription key. Required. */
    apikey: string;
    /** Forecast type. Defaults to "daily". */
    type?: "daily" | "hourly";
    /** Number of periods. Daily: 3, 5, or 7. Hourly: 6 or 12. */
    duration?: number;
}

export { }
