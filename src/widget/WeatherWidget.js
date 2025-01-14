import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/widget.css";

const WeatherWidget = () => {
  const [location, setLocation] = useState({ lat: 40.7128, lon: -74.006 }); // Default to New York
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Parse URL parameters for lat and lon
    const params = new URLSearchParams(window.location.search);
    const latParam = parseFloat(params.get("lat"));
    const lonParam = parseFloat(params.get("lon"));

    if (latParam && lonParam) {
      setLocation({ lat: latParam, lon: lonParam });
    }

    const fetchWeather = async () => {
      const { lat, lon } = location;
      const apiKey = "22ccfc5424b64920a681c2b721ce04e6";
      const url = `https://api.myradar.com/forecast?lat=${lat}&lon=${lon}&subscription-key=${apiKey}`;

      try {
        const response = await axios.get(url);
        setWeather(response.data);
      } catch (err) {
        setError("Could not fetch weather data");
        console.error(err);
      }
    };

    fetchWeather();
  }, [location]);

  if (error) {
    return <div className="widget-error">{error}</div>;
  }

  if (!weather) {
    return <div className="widget-loading">Loading...</div>;
  }

  return (
    <div className="weather-widget">
      <h3 className="widget-location">
        {weather.location ? weather.location.name : "Unknown"}
      </h3>
      <div className="widget-info">
        <p className="widget-temp">{Math.round(weather.forecast.temp)}°</p>
        <p className="widget-desc">{weather.forecast.description}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
