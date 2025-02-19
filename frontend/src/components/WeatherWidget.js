import React from "react";

const WeatherWidget = ({ weather }) => {
  return (
    <div className="bg-blue-200 p-4 rounded-lg shadow text-center">
      <h2 className="text-lg font-semibold mb-2">Weather</h2>
      <p className="text-xl font-bold">{weather.temperature}°C</p>
      <p className="text-sm">{weather.condition}</p>
    </div>
  );
};

export default WeatherWidget;