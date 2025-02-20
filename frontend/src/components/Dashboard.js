import React from "react";
import WeatherWidget from "./WeatherWidget";
import DeviceCard from "./DeviceCard";
import LightingControl from "./LightingControl";
import ThermostatControl from "./ThermostatControl";

const Dashboard = ({ user }) => {
  return (
    <div className="w-5/6 p-6 bg-white h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
        <input
          type="text"
          placeholder="Search any devices here"
          className="p-2 border rounded-lg w-1/3"
        />
      </div>

      {/* Weather and Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <WeatherWidget weather={user.weather} />
        <div className="bg-gray-200 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Humidity</h2>
          <p className="text-xl font-bold">{user.humidity}%</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Consumption</h2>
          <p className="text-xl font-bold">{user.totalConsumption} kWh</p>
          <p className="text-sm">Cost: ${(user.totalConsumption * 0.12).toFixed(2)}/hr</p>
        </div>
      </div>

      {/* Device Controls */}
      <div className="grid grid-cols-2 gap-4">
        <LightingControl intensity={user.lighting.intensity} />
        <ThermostatControl temperature={user.thermostat.temperature} />
      </div>

      {/* Smart Devices */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {user.devices.map((device, index) => (
          <DeviceCard key={index} name={device.name} status={device.status} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
