import React, { useState } from 'react';
import { Thermometer, ChevronUp, ChevronDown } from 'lucide-react';

const ThermostatControl = ({ temperature = 72 }) => {
  const [temp, setTemp] = useState(temperature);
  const [isAdjusting, setIsAdjusting] = useState(false);

  const adjustTemperature = (amount) => {
    const newTemp = Math.min(90, Math.max(50, temp + amount));
    setTemp(newTemp);
    setIsAdjusting(true);
    setTimeout(() => setIsAdjusting(false), 1000);
  };

  const handleInputChange = (e) => {
    const newTemp = Math.min(90, Math.max(50, parseInt(e.target.value) || 50));
    setTemp(newTemp);
  };

  const getTemperatureColor = (t) => {
    if (t < 65) return 'text-blue-500';
    if (t > 75) return 'text-red-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Thermostat</h2>
        <Thermometer 
          size={24} 
          className={getTemperatureColor(temp)}
        />
      </div>

      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => adjustTemperature(-1)}
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronDown size={24} />
        </button>

        <div className="text-center">
          <div className="relative">
            <input
              type="number"
              value={temp}
              onChange={handleInputChange}
              className={`text-4xl font-bold w-24 text-center bg-transparent ${getTemperatureColor(temp)}`}
            />
            <span className="text-2xl text-gray-600">°F</span>
          </div>
          {isAdjusting && (
            <p className="text-sm text-gray-500 animate-fade-out">Adjusting...</p>
          )}
        </div>

        <button
          onClick={() => adjustTemperature(1)}
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronUp size={24} />
        </button>
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>Min: 50°F</span>
        <span>Max: 90°F</span>
      </div>
    </div>
  );
};

export default ThermostatControl;