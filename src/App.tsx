import React from "react";
import WeatherWidget from "./widget/WeatherWidget";

const App = () => {
  // Standalone / iframe build: the API key comes from the URL or build env.
  // (As a library, consumers pass `apikey` as a required prop instead.)
  const params = new URLSearchParams(window.location.search);
  const apikey = params.get("apiKey") || process.env.REACT_APP_MYRADAR_KEY || "";

  return (
    <div style={{ height: "100%" }}>
      <WeatherWidget apikey={apikey} />
    </div>
  );
};

export default App;
