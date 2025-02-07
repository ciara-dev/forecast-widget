import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ClearDay from "../images/clear-day.png";
import ClearNight from "../images/clear-night.png";
import Rain from "../images/rain.png";
import Snow from "../images/snow.png";
import Sleet from "../images/sleet.png";
import Wind from "../images/wind.png";
import WindLevel2 from "../images/wind_level2.png";
import WindLevel3 from "../images/wind_level3.png";
import WindLevel4 from "../images/wind_level4.png";
import Fog from "../images/fog.png";
import Cloudy from "../images/cloudy.png";
import PartlyCloudyDay from "../images/partly-cloudy-day.png";
import PartlyCloudyDayBackgorund from "../images/backgrounds/partly-cloudy-day_Background.jpg";
import PartlyCloudyNight from "../images/partly-cloudy-night.png";
import WindDetail from "../images/detail_icons/windDetail.png"
import RainDetail from "../images/detail_icons/rainDetail.png"
import MyRadarLogo from "../images/logo/MyRadar_logo.png";
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
  windSpeed: number;
  summary: string;
  temperatureHigh: number;
  apparentTemperatureMax: number;
  windBearing: number;
  precipProbability: number;
}

interface HourlyForecast {
  time: number;
  icon: string;
  windSpeed: number;
  temperature: number;
  apparentTemperature: number;
  precipProbability: number;
  windBearing: number;
}

interface Location {
  lat: number;
  lon: number;
}

// Define WeatherMapping Type
type WeatherMapping = Record<
  string,
  { icon: string; gradient: string; backgroundImage: string } | undefined
>;

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<Location>({
    lat: 40.7128,
    lon: -74.006,
  });
  const [type, setType] = useState<"daily" | "hourly">("daily");
  const [duration, setDuration] = useState<number>(7);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const weatherMapping: WeatherMapping = {
    "clear-day": {
      icon: ClearDay,
      gradient: "linear-gradient(to bottom, #87CEEB, #FFD700)",
      backgroundImage: PartlyCloudyDayBackgorund,
    },
    "clear-night": {
      icon: ClearNight,
      gradient: "linear-gradient(to bottom, #2C3E50, #34495E)",
      backgroundImage: PartlyCloudyDayBackgorund,
    },
    rain: {
      icon: Rain,
      gradient: "linear-gradient(to bottom, #4A90E2, #5C6BC0)",
      backgroundImage: PartlyCloudyDayBackgorund,
    },
    snow: {
      icon: Snow,
      gradient: "linear-gradient(to bottom, #E0F7FA, #B3E5FC)",
      backgroundImage: PartlyCloudyDayBackgorund,
    },
    sleet: {
      icon: Sleet,
      gradient: "linear-gradient(to bottom, #9E9E9E, #607D8B)",
      backgroundImage: PartlyCloudyDayBackgorund,
    },
    wind: {
      icon: Wind,
      gradient: "linear-gradient(to bottom, #9E9E9E, #ECEFF1)",
      backgroundImage: PartlyCloudyDayBackgorund,
    },
    fog: {
      icon: Fog,
      gradient: "linear-gradient(to bottom, #BDBDBD, #E0E0E0)",
      backgroundImage: PartlyCloudyDayBackgorund,
    },
    cloudy: {
      icon: Cloudy,
      gradient: "linear-gradient(to bottom, #90A4AE, #CFD8DC)",
      backgroundImage: PartlyCloudyDayBackgorund,
    },
    "partly-cloudy-day": {
      icon: PartlyCloudyDay,
      gradient:
        "linear-gradient(0deg, hsla(49, 84%, 66%, 1) 0%, hsla(39, 34%, 66%, 1) 50%, hsla(220, 11%, 78%, 1) 100%)",
      backgroundImage: PartlyCloudyDayBackgorund,
    },
    "partly-cloudy-night": {
      icon: PartlyCloudyNight,
      gradient: "linear-gradient(to bottom, #4C4F5E, #9198A4)",
      backgroundImage: PartlyCloudyDayBackgorund,
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
    const durationParam = parseInt(
      params.get(typeParam === "hourly" ? "hours" : "days") || "7"
    );
    const apiKeyParam =
      params.get("apiKey"); // ADD KEY HERE with or operator || process.env.REACT_APP_MYRADAR_KEY

    if (!apiKeyParam) {
      setError("API key is required");
      return;
    }

    setApiKey(apiKeyParam);
    setLocation({ lat: latParam, lon: lonParam });
    setType(
      typeParam === "hourly" || typeParam === "daily" ? typeParam : "daily"
    );
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

  /****************************/
  //Testing Dropdown functions
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value as "daily" | "hourly");
    setDuration(event.target.value === "hourly" ? 6 : 7); // Set default duration
  };

  const handleDurationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDuration(parseInt(event.target.value, 10));
  };
  /* End of Dropdown function */
  /****************************/

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

  //Summary Sentence split
  const getSummarySentence = (text: string): string => {
    const match = text.match(/(.*?)[.!?]\s|(.+)[.!?]$/);
    return match ? (match[1] || match[2]) : text;
  };

  //Wind leveling Icons
  function getWindIcon(windSpeed: number): string {
    if (windSpeed <= 10) return Wind;
    if (windSpeed <= 15) return WindLevel2;
    if (windSpeed <= 20) return WindLevel3;
    return WindLevel4;
  }

  function degToCompass(num: number): string {
    const val = Math.floor(num / 22.5 + 0.5);
    const directions = [
      "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
      "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
    ];
    return directions[val % 16];
  }

  if (error) {
    return <div className="widget-error">{error}</div>;
  }

  if (!weather) {
    return <div className="widget-loading">Loading...</div>;
  }

  const currentWeather = weather.daily?.data[0];
  const currentMapping =
    currentWeather && weatherMapping[currentWeather.icon]
      ? weatherMapping[currentWeather.icon]
      : { backgroundImage: "" };

  return (
    <div
      className="weather-widget"
      style={{
        backgroundImage: `url(${currentMapping?.backgroundImage}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "8px",
        padding: "20px",
        color: "#333",
      }}
    >
      {/* Testing dropdowns to swtich between hourly and daily times */}
      <div className="testing-dropdowns">
        <div className="type-parent">
          <label className="type-label">Type:</label>
          <select value={type} onChange={handleTypeChange}>
            <option value="daily">Daily</option>
            <option value="hourly">Hourly</option>
          </select>
        </div>
        <div className="duration-parent">
          <label className="duration-label">Duration:</label>
          <select value={duration} onChange={handleDurationChange}>
            {type === "daily" ? (
              <>
                <option value={3}>3 Days</option>
                <option value={5}>5 Days</option>
                <option value={7}>7 Days</option>
              </>
            ) : (
              <>
                <option value={6}>6 Hours</option>
                <option value={12}>12 Hours</option>
              </>
            )}
          </select>
        </div>
      </div>
      <img
        className="myradar-logo"
        style={{ width: "25%", margin: "5px auto" }}
        src={MyRadarLogo}
        alt="MyRadar Logo"
      />
      {/* <h3 className="widget-location">{weather.timezone}</h3> */}
      {type === "daily" ? (
        <div className="widget-daily">
          {weather.daily.data.slice(0, duration).map((day, index) => {
            const windDirection = degToCompass(day.windBearing); // Convert wind bearing to direction
            return (
              <div key={index} className="daily-weather">
                <div className="day-header">
                  <h4 className="widget-day">{getDayName(day.time)}</h4>
                </div>
                <div className="daily-content">
                  <img
                    className="widget-icon"
                    src={
                      day.icon === "wind"
                        ? getWindIcon(day.windSpeed) // Replace only if the icon is wind
                        : weatherMapping[day.icon]?.icon // Use default mapping otherwise
                    }
                    alt={day.icon}
                    width={50}
                    height={50}
                  />
                  <p className="widget-temp-high">{Math.round(day.temperatureHigh)}°</p>
                  <p className="widget-feels-like-high">Feels like {Math.round(day.apparentTemperatureMax)}°</p>
                  <p className="widget-summary">{getSummarySentence(day.summary)}</p>
                  <div className="widget-windRain-box">
                    <div className="wind-box">
                      <img className="wind-detail-icon" src={WindDetail} alt="wind-detail-icon" />
                      {/* The multiplication of 2.23694 is to convert m/s to MPH */}
                      <p className="widget-wind-direction">{windDirection} {Math.round(day.windSpeed * 2.23694)} MPH</p>
                    </div>
                    <div className="precip-box">
                      <img className="rain-detail-icon" src={RainDetail} alt="rain-detail-icon" />
                      <p className="widget-precip-percent">{Math.round(day.precipProbability * 100)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="widget-hourly">
          {weather.hourly.data.slice(0, duration).map((hour, index) => {
            const windDirection = degToCompass(hour.windBearing); // Convert wind bearing to direction
            return (
              <div key={index} className="hourly-weather">
                <div className="day-header">
                  <h4 className="widget-hour">
                    {new Date(hour.time * 1000).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      hour12: true,
                    })}
                  </h4>
                </div>
                <div className="hourly-content">
                  <img
                    className="widget-icon"
                    src={
                      hour.icon === "wind"
                        ? getWindIcon(hour.windSpeed) // Replace only if the icon is wind
                        : weatherMapping[hour.icon]?.icon // Use default mapping otherwise
                    }
                    alt={hour.icon}
                    width={50}
                    height={50}
                  />
                  <p className="widget-temp">{Math.round(hour.temperature)}°F</p>
                  <p className="widget-feels-like">
                    feels like: {Math.round(hour.apparentTemperature)}°F
                  </p>
                  <p className="widget-precipitation">
                    Precipitation: {Math.round(hour.precipProbability * 100)}%
                  </p>
                  <p className="widget-wind-direction">Wind: {windDirection}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default WeatherWidget;
