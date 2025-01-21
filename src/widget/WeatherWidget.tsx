import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ClearDay from "../images/clear-day.png";
import ClearNight from "../images/clear-night.png";
import Rain from "../images/rain.png";
import Snow from "../images/snow.png";
import Sleet from "../images/sleet.png";
import Wind from "../images/wind.png";
import Fog from "../images/fog.png";
import Cloudy from "../images/cloudy.png";
import PartlyCloudyDay from "../images/partly-cloudy-day.png";
import PartlyCloudyNight from "../images/partly-cloudy-night.png";
import "../styles/widget.css";

// Define Types
interface WeatherData {
  daily: {
    data: DailyForecast[];
  };
  hourly: {
    data: HourlyForecast[];
  };
  timezone: string;
}

interface DailyForecast {
  time: number;
  icon: string;
  temperatureHigh: number;
  temperatureLow: number;
}

interface HourlyForecast {
  time: number;
  icon: string;
  temperature: number;
  apparentTemperature: number;
  precipProbability: number;
  windSpeed: number;
}

interface Location {
  lat: number;
  lon: number;
}

// Define WeatherMapping Type
type WeatherMapping = Record<
  string,
  { icon: string; gradient: string } | undefined
>;

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<Location>({ lat: 40.7128, lon: -74.006 });
  const [type, setType] = useState<"daily" | "hourly">("daily");
  const [duration, setDuration] = useState<number>(7);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const weatherMapping: WeatherMapping = {
    "clear-day": {
      icon: ClearDay,
      gradient: "linear-gradient(to bottom, #87CEEB, #FFD700)",
    },
    "clear-night": {
      icon: ClearNight,
      gradient: "linear-gradient(to bottom, #2C3E50, #34495E)",
    },
    "rain": {
      icon: Rain,
      gradient: "linear-gradient(to bottom, #4A90E2, #5C6BC0)",
    },
    "snow": {
      icon: Snow,
      gradient: "linear-gradient(to bottom, #E0F7FA, #B3E5FC)",
    },
    "sleet": {
      icon: Sleet,
      gradient: "linear-gradient(to bottom, #9E9E9E, #607D8B)",
    },
    "wind": {
      icon: Wind,
      gradient: "linear-gradient(to bottom, #9E9E9E, #ECEFF1)",
    },
    "fog": {
      icon: Fog,
      gradient: "linear-gradient(to bottom, #BDBDBD, #E0E0E0)",
    },
    "cloudy": {
      icon: Cloudy,
      gradient: "linear-gradient(to bottom, #90A4AE, #CFD8DC)",
    },
    "partly-cloudy-day": {
      icon: PartlyCloudyDay,
      gradient:
        "linear-gradient(0deg, hsla(49, 84%, 66%, 1) 0%, hsla(39, 34%, 66%, 1) 50%, hsla(220, 11%, 78%, 1) 100%)",
    },
    "partly-cloudy-night": {
      icon: PartlyCloudyNight,
      gradient: "linear-gradient(to bottom, #4C4F5E, #9198A4)",
    },
  };

  useEffect(() => {
   //This prevent the call being made multiple time once the data is marked as collected
    if (hasFetched.current) return;
    hasFetched.current = true;

    const params = new URLSearchParams(window.location.search);
    const latParam = parseFloat(params.get("lat") || "40.7128"); // Default to New York lat
    const lonParam = parseFloat(params.get("lon") || "-74.006"); // Default to New York lon
    const typeParam = params.get("type") as "daily" | "hourly";
    const durationParam = parseInt(params.get(typeParam === "hourly" ? "hours" : "days") || "7");
    const apiKeyParam = params.get("apiKey");

    if (!apiKeyParam) {
      setError("API key is required");
      return;
    }

    setApiKey(apiKeyParam);
    setLocation({ lat: latParam, lon: lonParam });
    setType(typeParam === "hourly" || typeParam === "daily" ? typeParam : "daily");
    setDuration(
      (typeParam === "hourly" && [6, 12].includes(durationParam)) ||
        (typeParam === "daily" && [3, 5, 7].includes(durationParam))
        ? durationParam
        : 7
    );

    const fetchWeather = async () => {
      try {
        const url = `https://api.myradar.dev/v1/forecast/${latParam},${lonParam}?subscription-key=${apiKeyParam}`;
        const response = await axios.get<WeatherData>(url);
        setWeather(response.data);
      } catch (err) {
        setError("Could not fetch weather data");
        console.error(err);
      }
    };

    fetchWeather();
  }, []);

  const getDayName = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    }
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  if (error) {
    return <div className="widget-error">{error}</div>;
  }

  if (!weather) {
    return <div className="widget-loading">Loading...</div>;
  }

  const currentWeather = weather.daily?.data[0];
  const currentMapping = currentWeather && weatherMapping[currentWeather.icon] 
    ? weatherMapping[currentWeather.icon] 
    : { gradient: "linear-gradient(to bottom, #FFF, #EEE)" };

  return (
    <div
      className="weather-widget"
      style={{
        background: currentMapping?.gradient,
        borderRadius: "8px",
        padding: "20px",
        color: "#333",
      }}
    >
      <h3 className="widget-location">{weather.timezone}</h3>
      {type === "daily" ? (
        <div className="widget-daily">
          {weather.daily.data.slice(0, duration).map((day, index) => (
            <div key={index} className="daily-weather">
              <h4 className="widget-day">{getDayName(day.time)}</h4>
              <img
                className="widget-icon"
                src={weatherMapping[day.icon]?.icon}
                alt={day.icon}
                width={50}
                height={50}
              />
              <p className="widget-temp-high">{day.temperatureHigh}°F</p>
              <p className="widget-temp-low">{day.temperatureLow}°F</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="widget-hourly">
          {weather.hourly.data.slice(0, duration).map((hour, index) => (
            <div key={index} className="hourly-weather">
              <h4 className="widget-hour">
                {new Date(hour.time * 1000).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  hour12: true,
                })}
              </h4>
             
                  <img
                    className="widget-icon"
                    src={weatherMapping[hour.icon]?.icon}
                    alt={hour.icon}
                    width={50}
                    height={50}
                  />
              
              <p className="widget-temp">{hour.temperature}°F</p>
              <p>Real Feel: {hour.apparentTemperature}°F</p>
              <p>Precipitation: {Math.round(hour.precipProbability * 100)}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
