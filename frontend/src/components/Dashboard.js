import React, { useState } from "react";
import { Search, Home } from 'lucide-react';
import WeatherWidget from "./WeatherWidget";
import DeviceCard from "./DeviceCard";
import LightingControl from "./LightingControl";
import ThermostatControl from "./ThermostatControl";

const Dashboard = ({ user, selectedRoom, setSelectedDevice }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDevices = selectedRoom
    ? user.devices.filter((device) => 
        device.room === selectedRoom.name &&
        device.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : user.devices.filter((device) =>
        device.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          {selectedRoom && (
            <button
              onClick={() => window.location.reload()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Home className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-3xl font-bold text-gray-800">
            {selectedRoom ? selectedRoom.name : `Welcome, ${user.name}`}
          </h1>
        </div>
        
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {!selectedRoom && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <WeatherWidget weather={user.weather} />
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">Humidity</h2>
              <p className="text-3xl font-bold text-blue-500">{user.humidity}%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">Total Consumption</h2>
              <p className="text-3xl font-bold text-green-500">{user.totalConsumption} kWh</p>
              <p className="text-sm text-gray-600">Cost: ${(user.totalConsumption * 0.12).toFixed(2)}/hr</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <LightingControl intensity={user.lighting.intensity} />
            <ThermostatControl temperature={user.thermostat.temperature} />
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.length > 0 ? (
          filteredDevices.map((device) => (
            <DeviceCard key={device.id} device={device} onClick={setSelectedDevice} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">No devices found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;