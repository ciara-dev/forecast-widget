import React from "react";
import WeatherWidget from "./components/WeatherWidget";

const App = () => {
  return (
    <div>
      <WeatherWidget city="London" />
    </div>
  );
};

export default App;
