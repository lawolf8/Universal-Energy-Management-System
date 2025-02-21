import React, { useState } from 'react';
import { Sun } from 'lucide-react';

const LightingControl = ({ intensity = 50 }) => {
  const [lightValue, setLightValue] = useState(intensity);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderChange = (e) => {
    const newValue = Math.min(100, Math.max(0, parseInt(e.target.value)));
    setLightValue(newValue);
  };

  const handleInputChange = (e) => {
    const newValue = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
    setLightValue(newValue);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Lighting Control</h2>
        <Sun 
          size={24} 
          className={`text-yellow-500 transition-opacity ${
            lightValue > 0 ? 'opacity-100' : 'opacity-50'
          }`}
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="100"
            value={lightValue}
            onChange={handleSliderChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="100"
              value={lightValue}
              onChange={handleInputChange}
              className="w-16 p-1 text-center border rounded"
            />
            <span className="text-gray-600">%</span>
          </div>
        </div>

        <div className="h-4 bg-gradient-to-r from-gray-200 to-yellow-400 rounded-full"
             style={{ clipPath: `inset(0 ${100 - lightValue}% 0 0)` }}
        />

        <div className="flex justify-between text-sm text-gray-600">
          <span>Off</span>
          <span className="font-medium">
            {lightValue}% {isDragging && '(Adjusting...)'}
          </span>
          <span>Max</span>
        </div>
      </div>
    </div>
  );
};

export default LightingControl;