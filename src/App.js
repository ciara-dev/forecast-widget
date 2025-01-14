import React from "react";
import WeatherWidget from "./widget/WeatherWidget";

const App = () => {
  return (
    <div>
      <WeatherWidget city="London" />
    </div>
  );
};

export default App;
