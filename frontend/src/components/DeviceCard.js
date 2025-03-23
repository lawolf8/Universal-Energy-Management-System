import React from "react";
import { Power } from 'lucide-react';
import '../pulse-theme.css';

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

function DeviceCard({ device, onClick, onTogglePower }) {
  const isOn = device.status === "On";
  
  const handleCardClick = () => {
    onClick(device); // Open the popup when the card is clicked
  };

  const handlePowerToggle = (e) => {
    e.stopPropagation(); // Prevent opening the device popup
    
    // Toggle the device power
    if (onTogglePower) {
      onTogglePower(device.id, !isOn);
    }
  };

  const getDeviceImage = (deviceType) => {
    return deviceImages[deviceType] || noniotIcon; // fallback to generic device icon
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer transform transition-all hover:scale-102 hover:shadow-md active:bg-gray-50"
      onClick={handleCardClick}
      role="button"
      aria-label={`View details for ${device.name}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
            <img
              src={getDeviceImage(device.name)}
              alt={device.name}
              className="w-12 h-12"
              style={{ filter: isOn ? 'none' : 'grayscale(100%)' }}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{device.name}</h3>
            <p className="text-sm text-gray-500">{device.room}</p>
            <div className="mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isOn ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isOn ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handlePowerToggle}
          className={`p-3 rounded-full transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isOn ? 'bg-green-100 focus:ring-green-500' : 'bg-red-100 focus:ring-red-500'
          }`}
          aria-label={isOn ? "Turn off device" : "Turn on device"}
        >
          <Power
            className={`w-6 h-6 ${isOn ? 'text-green-600' : 'text-red-500'}`}
          />
        </button>
      </div>
      
      <div className="mt-6 flex justify-between items-center text-sm">
        <div className="bg-gray-50 p-3 rounded-lg flex-1 mr-2 text-center">
          <p className="text-gray-500 mb-1">Power Usage</p>
          <p className="font-bold text-lg text-gray-800">{device.watts || 0}W</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg flex-1 ml-2 text-center">
          <p className="text-gray-500 mb-1">Cost/hr</p>
          <p className="font-bold text-lg text-gray-800">${((device.watts || 0) * 0.12 / 1000).toFixed(2)}</p>
        </div>
      </div>
      
      {/* Visual indicator that card is clickable */}
      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <p className="text-sm text-blue-500">Tap for details</p>
      </div>
    </div>
  );
}

export default DeviceCard;