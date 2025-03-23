import React, { useState, useEffect } from 'react';
import { ThermometerIcon, ChevronUp, ChevronDown } from 'lucide-react';
import '../pulse-theme.css';

const ThermostatControl = ({ temperature = 75, unit = '°F', minTemp = 50, maxTemp = 90 }) => {
  // Initialize with the prop value and ensure it updates if prop changes
  const [currentTemp, setCurrentTemp] = useState(temperature);
  
  // Update state when prop changes
  useEffect(() => {
    setCurrentTemp(temperature);
  }, [temperature]);
  
  const increaseTemp = () => {
    if (currentTemp < maxTemp) {
      setCurrentTemp(prev => prev + 1);
    }
  };
  
  const decreaseTemp = () => {
    if (currentTemp > minTemp) {
      setCurrentTemp(prev => prev - 1);
    }
  };

  // Determine color based on temperature
  const isWarm = currentTemp > 75;
  const tempColor = isWarm ? 'text-red-500' : 'text-blue-500';
  const bgGradient = isWarm 
    ? 'from-red-50 to-orange-50' 
    : 'from-blue-50 to-cyan-50';
  const iconBg = isWarm ? 'bg-red-50' : 'bg-blue-50';
  const iconColor = isWarm ? 'text-red-500' : 'text-blue-500';

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 ${iconBg} rounded-full`}>
            <ThermometerIcon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Thermostat</h2>
        </div>
        <span className="text-sm text-gray-500">{minTemp}-{maxTemp}{unit}</span>
      </div>
      
      {/* Main control */}
      <div className={`flex-1 flex items-center justify-center p-4 bg-gradient-to-r ${bgGradient}`}>
        <div className="flex items-center gap-2">
          <button 
            onClick={decreaseTemp}
            className="p-2 rounded-full bg-white hover:bg-gray-100 active:bg-gray-200 transition-colors shadow-sm border border-gray-200"
            aria-label="Decrease temperature"
            type="button"
            data-testid="decrease-temp-button"
          >
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="text-center mx-2">
            <div className={`text-4xl font-bold ${tempColor}`}>{currentTemp}</div>
            <div className="text-sm text-gray-500">{unit}</div>
          </div>
          
          <button 
            onClick={increaseTemp}
            className="p-2 rounded-full bg-white hover:bg-gray-100 active:bg-gray-200 transition-colors shadow-sm border border-gray-200"
            aria-label="Increase temperature"
            type="button"
            data-testid="increase-temp-button"
          >
            <ChevronUp className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-3 border-t bg-gray-50 flex justify-between items-center text-xs text-gray-500">
        <span>Current: {currentTemp}{unit}</span>
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">ECO Mode</span>
      </div>
    </div>
  );
};

export default ThermostatControl;