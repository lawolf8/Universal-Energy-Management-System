import React, { useState, useEffect } from "react";
import { Search, Power, TrendingDown, Home, Filter } from 'lucide-react';
import WeatherWidget from "./WeatherWidget";
import DeviceCard from "./DeviceCard";
import LightingControl from "./LightingControl";
import ThermostatControl from "./ThermostatControl";
import { RoomEnergyCard, HomeEnergyPopup } from "./EnergyAnalytics";
import '../pulse-theme.css';

const Dashboard = ({ user, selectedRoom, setSelectedDevice }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEnergyPopup, setShowEnergyPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [electricityData, setElectricityData] = useState(null);
  const [electricityRate, setElectricityRate] = useState(0.12); // Default rate

  // Simulate loading on initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Fetch electricity cost data
  useEffect(() => {
    const fetchElectricityData = async () => {
      try {
        const address = user.address || user.zipCode || "33620";
        const response = await fetch(`http://localhost:5000/api/electric-cost?address=${address}`);
        
        if (!response.ok) {
          throw new Error(`Electric cost API returned status ${response.status}`);
        }
        
        const data = await response.json();
        setElectricityData(data);
        
        // Update electricity rate if available
        if (data && data.residential_rate) {
          setElectricityRate(parseFloat(data.residential_rate));
        }
      } catch (err) {
        console.error("Failed to fetch electricity cost data:", err);
        // Keep using the default rate
      }
    };

    fetchElectricityData();
  }, [user.address, user.zipCode]);

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        document.querySelector('input[type="text"]')?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getFilteredDevices = () => {
    let devices = user.devices;
    
    // Apply search filter
    devices = devices.filter(device => 
      device.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Apply room filter
    if (selectedRoom) {
      devices = devices.filter(device => device.room === selectedRoom.name);
    }
    
    // Apply active/inactive filter
    if (activeTab === "active") {
      devices = devices.filter(device => device.status === "On");
    } else if (activeTab === "inactive") {
      devices = devices.filter(device => device.status !== "On");
    }
    
    return devices;
  };

  const filteredDevices = getFilteredDevices();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-pulse-light">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pulse-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen overflow-y-auto">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search devices... (⌘/)"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Toggle */}
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center space-x-2 text-pulse-dark px-3 py-2 rounded-md hover:bg-gray-100"
        >
          <Filter className="h-5 w-5" />
          <span>Filters {showFilters ? '▲' : '▼'}</span>
        </button>

        {/* Desktop Filter Tabs */}
        <div className="hidden md:flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
          <button
            className={`px-4 py-2 rounded-l-lg ${activeTab === 'all' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'active' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${activeTab === 'inactive' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('inactive')}
          >
            Inactive
          </button>
        </div>

        {/* Energy Stats Button */}
        <button
          onClick={() => setShowEnergyPopup(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition duration-200 ml-auto"
        >
          <TrendingDown className="h-5 w-5" />
          <span>Energy Stats</span>
        </button>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="md:hidden flex gap-2 mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <button
            className={`flex-1 px-3 py-2 rounded-md ${activeTab === 'all' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`flex-1 px-3 py-2 rounded-md ${activeTab === 'active' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button
            className={`flex-1 px-3 py-2 rounded-md ${activeTab === 'inactive' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('inactive')}
          >
            Inactive
          </button>
        </div>
      )}

      {/* Top Bar with Room Name */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {selectedRoom && (
            <button
              onClick={() => window.location.reload()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Return home"
            >
              <Home className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            {selectedRoom ? (
              <>
                <span className="mr-2">{selectedRoom.icon || "🏠"}</span>
                {selectedRoom.name}
              </>
            ) : (
              <>
                <span className="mr-2">🏠</span>
                Home
              </>
            )}
          </h1>
        </div>
      </div>

      {/* Energy Stats Section */}
      {!selectedRoom && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Total Consumption Card */}
          <div 
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => setShowEnergyPopup(true)}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-full">
                <Power className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold">Total Consumption</h2>
            </div>
            <p className="text-3xl font-bold text-blue-500">
              {user.totalConsumption} kWh
            </p>
            <div className="mt-3 flex items-center text-sm text-gray-600">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span>Tap for detailed analytics</span>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-50 rounded-full">
                <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Cost Summary</h2>
            </div>
            <p className="text-3xl font-bold text-green-500">
              ${(user.totalConsumption * electricityRate).toFixed(2)}
            </p>
            <div className="mt-3 flex items-center text-sm text-gray-600">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                Based on ${electricityRate.toFixed(2)} per kWh
                {electricityData?.utility_name && ` from ${electricityData.utility_name}`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Room Energy Card - shown when room is selected */}
      {selectedRoom && (
        <div className="mb-6">
          <RoomEnergyCard room={selectedRoom} />
        </div>
      )}

      {/* Controls and Weather Section */}
      {!selectedRoom ? (
        // All three widgets in the main dashboard
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Use the LightingControl component */}
          <LightingControl 
            intensity={user.lighting?.intensity || 66} 
            rooms={user.rooms || rooms}
            activeRoom={selectedRoom}
          />

          {/* Use the ThermostatControl component - now smaller */}
          <ThermostatControl 
            temperature={user.thermostat?.temperature || 75}
            unit="°F"
            minTemp={50}
            maxTemp={90}
          />

          {/* Weather widget - now in the same row */}
          <div className="col-span-1 max-w-full h-full" style={{ minHeight: '280px' }}>
            <WeatherWidget 
              zipCode={user.zipCode || "33620"} 
            />
          </div>
        </div>
      ) : (
        // Only LightingControl in room-specific view
        <div className="mb-6">
          <LightingControl 
            intensity={user.lighting?.intensity || 66} 
            rooms={user.rooms || rooms}
            activeRoom={selectedRoom}
          />
        </div>
      )}

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.length > 0 ? (
          filteredDevices.map((device) => (
            <DeviceCard 
              key={device.id} 
              device={device} 
              onClick={() => setSelectedDevice(device)} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-gray-400 mx-auto w-16 h-16 mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 3H6a2 2 0 00-2 2v14c0 1.1.9 2 2 2h12a2 2 0 002-2V9L14 3H6zm4 0v6h6m-5 6v4m-2-2h4" />
              </svg>
            </div>
            <p className="text-gray-700 text-lg">No devices found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Energy Analytics Popup */}
      {showEnergyPopup && (
        <HomeEnergyPopup onClose={() => setShowEnergyPopup(false)} />
      )}
    </div>
  );
};

// Mock data for rooms if needed
const rooms = [
  { id: 'living', name: 'Living Room' },
  { id: 'kitchen', name: 'Kitchen' },
  { id: 'bedroom', name: 'Bedroom' },
  { id: 'bathroom', name: 'Bathroom' }
];

export default Dashboard;