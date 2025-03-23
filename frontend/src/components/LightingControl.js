import React, { useState, useEffect } from 'react';
import { Sun, ChevronDown, Home } from 'lucide-react';
import '../pulse-theme.css';

const LightingControl = ({ intensity = 66, rooms = [], activeRoom = null }) => {
  const [lightValue, setLightValue] = useState(intensity);
  const [showRoomSelector, setShowRoomSelector] = useState(false);
  
  // Add "All Rooms" option at the beginning
  const allRoomsOption = { id: 'all', name: 'All Rooms', icon: 'Home' };
  
  // Update selected room when activeRoom prop changes
  useEffect(() => {
    if (activeRoom) {
      setSelectedRoom(activeRoom);
    } else {
      setSelectedRoom(allRoomsOption);
    }
  }, [activeRoom]);
  
  const [selectedRoom, setSelectedRoom] = useState(activeRoom || allRoomsOption);
  
  const [lightPresets] = useState([
    { name: "Morning", value: 75 },
    { name: "Day", value: 100 },
    { name: "Evening", value: 50 },
    { name: "Night", value: 15 }
  ]);

  // Default rooms if none provided - ensure "All Rooms" option is first
  const availableRooms = [
    allRoomsOption,
    ...(rooms.length > 0 ? rooms : [
      { id: 'living', name: 'Living Room' },
      { id: 'kitchen', name: 'Kitchen' },
      { id: 'bedroom', name: 'Bedroom' },
      { id: 'bathroom', name: 'Bathroom' }
    ])
  ];

  const handleSliderChange = (e) => {
    const newValue = Math.min(100, Math.max(0, parseInt(e.target.value)));
    setLightValue(newValue);
  };

  const handleInputChange = (e) => {
    const newValue = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
    setLightValue(newValue);
  };
  
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setShowRoomSelector(false);
  };

  const applyPreset = (value) => {
    setLightValue(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-50 rounded-full">
            <Sun className="w-5 h-5 text-yellow-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Lighting Control</h2>
        </div>
        <div className="flex items-center p-1 px-2 bg-gray-100 rounded-full">
          <input 
            type="number" 
            min="0" 
            max="100" 
            className="w-10 bg-transparent text-center text-sm font-bold focus:outline-none text-gray-800"
            value={lightValue}
            onChange={handleInputChange}
          />
          <span className="text-gray-500 text-xs">%</span>
        </div>
      </div>
      
      {/* Room selector */}
      <div className="px-4 py-2 border-b bg-gray-50 flex justify-between items-center">
        <div className="relative">
          <button 
            onClick={() => setShowRoomSelector(!showRoomSelector)}
            className="flex items-center text-sm text-gray-700 hover:text-blue-600"
          >
            <span className="font-medium">Room:</span>
            <span className="ml-1 text-blue-600 flex items-center">
              {selectedRoom.id === 'all' && <Home size={14} className="mr-1" />}
              {selectedRoom?.name}
            </span>
            <ChevronDown size={16} className="ml-1" />
          </button>
          
          {showRoomSelector && (
            <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
              {availableRooms.map((room) => (
                <button
                  key={room.id || room.name}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center ${
                    selectedRoom.name === room.name ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                  onClick={() => handleRoomSelect(room)}
                >
                  {room.id === 'all' && <Home size={14} className="mr-1" />}
                  {room.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Main controls */}
      <div className="flex-grow p-4 flex flex-col justify-between bg-gradient-to-r from-gray-50 to-white">
        {/* Slider control */}
        <div className="flex-grow flex flex-col justify-center">
          <div className="mb-2 relative">
            <input
              type="range"
              min="0"
              max="100"
              value={lightValue}
              onChange={handleSliderChange}
              className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer"
            />
            
            <div 
              className="h-3 bg-gradient-to-r from-gray-200 to-yellow-400 rounded-full absolute top-0 left-0 pointer-events-none"
              style={{ width: `${lightValue}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>Off</span>
            <span>Max</span>
          </div>
        </div>
        
        {/* Preset buttons */}
        <div className="mt-4">
          <p className="text-xs font-medium text-gray-700 mb-1">Presets</p>
          <div className="grid grid-cols-4 gap-1">
            {lightPresets.map(preset => (
              <button 
                key={preset.name}
                onClick={() => applyPreset(preset.value)}
                className={`py-2 text-xs rounded-md transition-colors ${
                  lightValue === preset.value 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-white hover:bg-gray-100 shadow-sm border border-gray-200'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightingControl;