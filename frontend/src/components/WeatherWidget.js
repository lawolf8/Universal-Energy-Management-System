import React from "react";
import weatherIcon from "../assets/images/cloudy.png";

function WeatherWidget({ weather }) {
  return (
    <div className="bg-blue-200 p-5 rounded-xl shadow-md flex flex-col items-center">
      <img src={weatherIcon} alt="Weather Icon" className="w-14 h-14 mb-3" />
      <h3 className="text-lg font-bold">Weather</h3>
      <p className="text-xl">{weather}</p>
    </div>
  );
}

export default WeatherWidget;
