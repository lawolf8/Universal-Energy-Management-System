import React from "react";
import { Clock } from 'lucide-react';
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
import '../pulse-theme.css';

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

// Generate forecast for next 6 hours based on current weather (demo data)
const generateForecast = (currentWeather) => {
  const weatherTypes = ['Sunny', 'Cloudy', 'Rainy', 'Windy'];
  const hours = [];
  const now = new Date();
  
  // Use current weather as base and create some variations
  let currentIndex = weatherTypes.indexOf(currentWeather.condition);
  if (currentIndex === -1) currentIndex = 0;
  
  for (let i = 0; i < 6; i++) {
    const hour = new Date(now);
    hour.setHours(now.getHours() + i + 1);
    
    // Small random variations in temperature and conditions
    const tempVariation = Math.round((Math.random() * 4) - 2);
    const weatherVariation = Math.random() > 0.7 
      ? weatherTypes[(currentIndex + Math.floor(Math.random() * 3)) % weatherTypes.length] 
      : currentWeather.condition;
    
    hours.push({
      time: hour.getHours() + ':00',
      temperature: currentWeather.temperature + tempVariation,
      condition: weatherVariation
    });
  }
  
  return hours;
};

function WeatherWidget({ weather = { condition: 'Sunny', temperature: 22 } }) {
  const forecast = generateForecast(weather);
  
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-full">
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Weather</h2>
        </div>
        <span className="text-sm text-gray-500">Today</span>
      </div>
      
      {/* Current Weather */}
      <div className="p-6 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
        <div>
          <p className="text-sm text-gray-500 mb-1">Current Conditions</p>
          <p className="text-3xl font-bold text-blue-600">{weather.temperature}°C</p>
          <p className="text-gray-700">{weather.condition}</p>
        </div>
        <img
          src={weatherIcons[weather.condition] || cloud}
          alt={weather.condition}
          className="w-16 h-16"
        />
      </div>
      
      {/* Forecast */}
      <div className="p-4 flex-grow">
        <p className="text-sm font-medium text-gray-700 mb-3">Next 6 Hours</p>
        <div className="grid grid-cols-6 gap-2">
          {forecast.map((hour, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">{hour.time}</span>
              <img 
                src={weatherIcons[hour.condition] || cloud} 
                alt={hour.condition}
                className="w-8 h-8 mb-1"
              />
              <span className="text-xs font-semibold text-gray-700">{hour.temperature}°</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Daily Stats */}
      <div className="p-4 border-t bg-gray-50">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div>
            <p className="text-xs text-gray-500">Humidity</p>
            <p className="text-sm font-semibold text-gray-700">{Math.round(Math.random() * 30) + 60}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Wind</p>
            <p className="text-sm font-semibold text-gray-700">{Math.round(Math.random() * 10) + 5} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;
