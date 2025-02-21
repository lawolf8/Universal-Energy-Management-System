import React from "react";
import cloudy from "../assets/images/cloudy.png";
import sun from "../assets/images/sun.png";
import snowy from "../assets/images/snowy.png";
import hail from "../assets/images/hail.png";
import cloud from "../assets/images/cloud.png"; // Fallback image

// Additional icons
import windy from "../assets/images/windy.png";
import fog from "../assets/images/fog.png";
import night from "../assets/images/night.png";
import nightrainy from "../assets/images/nightrainy.png";
import rainy from "../assets/images/rainy.png";

const weatherIcons = {
  // Map each condition to its corresponding icon
  Cloudy: cloudy,
  Rainy: rainy,
  Sunny: sun,
  Snowy: snowy,
  Hail: hail,
  Windy: windy,
  Fog: fog,
  Night: night,
  NightRainy: nightrainy,
};

function WeatherWidget({ weather }) {
  return (
    <div className="bg-blue-200 p-4 rounded-lg shadow flex items-center">
      <img
        src={weatherIcons[weather.condition] || cloud}
        alt="Weather Icon"
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
