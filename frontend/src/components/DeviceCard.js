import React from "react";
import { Power } from 'lucide-react';

// Import all images - you'll need to add these imports to your component file
import lightbulbIcon from '../assets/images/lightbulb.png';
import televisionIcon from '../assets/images/television.png';
import fridgeIcon from '../assets/images/fridge.png';
import speakerIcon from '../assets/images/speaker.png';
import temperatureIcon from '../assets/images/temperature.png';
import noniotIcon from '../assets/images/noniot.png';

// Map device types to imported images
const deviceImages = {
  "Smart Light": lightbulbIcon,
  "Television": televisionIcon,
  "Fridge": fridgeIcon,
  "Speaker": speakerIcon,
  "Temperature Sensor": temperatureIcon
};

function DeviceCard({ device, onClick }) {
  const isOn = device.status === "On";
  
  const handlePowerClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking power button
    onClick(device); // Use the onClick prop that's passed from the parent
  };

  const getDeviceImage = (deviceType) => {
    return deviceImages[deviceType] || noniotIcon; // fallback to generic device icon
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src={getDeviceImage(device.name)}
              alt={device.name}
              className="w-10 h-10"
              style={{ filter: isOn ? 'none' : 'grayscale(100%)' }}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{device.name}</h3>
            <p className="text-sm text-gray-600">{device.room}</p>
          </div>
        </div>
        <button 
          onClick={handlePowerClick}
          className={`p-2 rounded-full transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isOn ? 'focus:ring-green-500' : 'focus:ring-red-500'
          }`}
        >
          <Power 
            className={`w-6 h-6 ${isOn ? 'text-green-500' : 'text-red-500'}`} 
          />
        </button>
      </div>
      
      <div className="mt-4 flex justify-between items-center text-sm">
        <div>
          <p className="text-gray-600">Power Usage</p>
          <p className="font-semibold">{device.watts || 0}W</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Cost/hr</p>
          <p className="font-semibold">${((device.watts || 0) * 0.12 / 1000).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default DeviceCard;