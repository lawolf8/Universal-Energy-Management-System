import React from "react";
import cloudy from "../assets/images/cloudy.png";
import sun from "../assets/images/sun.png";
import snowy from "../assets/images/snowy.png";
import hail from "../assets/images/hail.png";
import cloud from "../assets/images/cloud.png"; // Fallback image

const weatherIcons = {
  Rainy: cloudy,
  Sunny: sun,
  Snowy: snowy,
  Hail: hail
};

function WeatherWidget({ weather }) {
  return (
    <div className="bg-blue-200 p-4 rounded-lg shadow flex items-center">
      <img
        src={weatherIcons[weather.condition] || cloud}
        alt="Weather"
        className="w-12 h-12 mr-4"
      />
      <div>
        <h2 className="text-lg font-semibold">Weather</h2>
        <p className="text-xl font-bold">{weather.temperature}°C</p>
        <p>{weather.condition}</p>
      </div>
    </div>
  );
}

export default WeatherWidget;
