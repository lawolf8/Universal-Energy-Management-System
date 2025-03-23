import React, { useState, useEffect } from "react";
import { Clock, CloudRain, CloudSun, Cloud, Sun, Wind, Snowflake } from 'lucide-react';
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

// Weather condition mapping to our icons
const weatherIcons = {
  // Map each condition to its corresponding icon
  "Cloudy": cloudy,
  "Mostly Cloudy": cloudy,
  "Partly Cloudy": cloudy,
  "Rainy": rainy,
  "Rain": rainy,
  "Showers": rainy,
  "Sunny": sun,
  "Clear": sun,
  "Mostly Clear": sun,
  "Partly Sunny": sun,
  "Mostly Sunny": sun,
  "Snow": snowy,
  "Snowy": snowy,
  "Hail": hail,
  "Windy": windy,
  "Fog": fog,
  "Foggy": fog,
  "Night": night,
  "NightRainy": nightrainy,
  // Fallback
  "default": cloud
};

// Get weather icon based on forecast description
const getWeatherIcon = (forecast) => {
  // Convert forecast to title case for consistency
  const normalizedForecast = forecast?.replace(/\w\S*/g, 
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  
  // Check for specific conditions
  if (!normalizedForecast) return weatherIcons.default;
  
  // Look for keywords in the forecast
  if (normalizedForecast.includes('Rain') || normalizedForecast.includes('Shower')) {
    return weatherIcons.Rainy || rainy;
  } else if (normalizedForecast.includes('Cloud')) {
    return weatherIcons.Cloudy || cloudy;
  } else if (normalizedForecast.includes('Sun') || normalizedForecast.includes('Clear')) {
    return weatherIcons.Sunny || sun;
  } else if (normalizedForecast.includes('Snow')) {
    return weatherIcons.Snowy || snowy;
  } else if (normalizedForecast.includes('Wind')) {
    return weatherIcons.Windy || windy;
  } else if (normalizedForecast.includes('Fog')) {
    return weatherIcons.Fog || fog;
  }
  
  // Fallback
  return weatherIcons.default || cloud;
};

function WeatherWidget({ zipCode = "33620" }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/weather?zipcode=${zipCode}`);
        
        if (!response.ok) {
          throw new Error(`Weather API returned status ${response.status}`);
        }
        
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
        setError(err.message);
        // Use fallback weather data for demo purposes
        setWeatherData({
          current: {
            temperature: 75,
            temperatureUnit: "F",
            shortForecast: "Sunny",
            windSpeed: "10 mph",
            windDirection: "SW"
          },
          forecast: [
            { name: "Tonight", temperature: 68, shortForecast: "Clear" },
            { name: "Monday", temperature: 78, shortForecast: "Partly Cloudy" },
            { name: "Monday Night", temperature: 65, shortForecast: "Cloudy" },
            { name: "Tuesday", temperature: 72, shortForecast: "Rainy" },
            { name: "Tuesday Night", temperature: 66, shortForecast: "Mostly Cloudy" }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    
    // Refresh weather data every hour
    const intervalId = setInterval(fetchWeatherData, 60 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [zipCode]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    );
  }

  if (error) {
    console.log("Rendering error state:", error);
  }

  const current = weatherData?.current || { temperature: 75, temperatureUnit: "F", shortForecast: "Sunny" };
  const forecast = weatherData?.forecast || [];
  
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
        <span className="text-sm text-gray-500">ZIP: {zipCode}</span>
      </div>
      
      {/* Current Weather */}
      <div className="p-6 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
        <div>
          <p className="text-sm text-gray-500 mb-1">Current Conditions</p>
          <p className="text-3xl font-bold text-blue-600">{current.temperature}°{current.temperatureUnit}</p>
          <p className="text-gray-700">{current.shortForecast}</p>
          <p className="text-sm text-gray-500 mt-1">Wind: {current.windSpeed} {current.windDirection}</p>
        </div>
        <img
          src={getWeatherIcon(current.shortForecast)}
          alt={current.shortForecast}
          className="w-16 h-16"
        />
      </div>
      
      {/* Forecast */}
      <div className="p-4 flex-grow">
        <p className="text-sm font-medium text-gray-700 mb-3">Forecast</p>
        <div className="grid grid-cols-5 gap-2">
          {forecast.map((period, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">{period.name.split(' ')[0]}</span>
              <img 
                src={getWeatherIcon(period.shortForecast)} 
                alt={period.shortForecast}
                className="w-8 h-8 mb-1"
              />
              <span className="text-xs font-semibold text-gray-700">{period.temperature}°</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-3 border-t bg-gray-50 text-center text-xs text-gray-500">
        <p>Data from National Weather Service</p>
      </div>
    </div>
  );
}

export default WeatherWidget;
