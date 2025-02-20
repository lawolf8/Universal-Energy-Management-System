import React from "react";
import WeatherWidget from "./WeatherWidget";
import DeviceCard from "./DeviceCard";
import LightingControl from "./LightingControl";
import ThermostatControl from "./ThermostatControl";

const Dashboard = ({ user, selectedRoom, setSelectedDevice }) => {
  const filteredDevices = selectedRoom
    ? user.devices.filter((device) => device.room === selectedRoom.name)
    : user.devices;

  return (
    <div className="w-5/6 p-6 bg-white h-screen overflow-y-auto">
      {selectedRoom && (
        <button
          onClick={() => window.location.reload()}
          className="mb-4 p-2 bg-gray-300 rounded shadow"
        >
          ← Back
        </button>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {selectedRoom ? selectedRoom.name : `Welcome, ${user.name}`}
        </h1>
        <input
          type="text"
          placeholder="Search any devices here"
          className="p-2 border rounded-lg w-1/3"
        />
      </div>

      {!selectedRoom && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <WeatherWidget weather={user.weather} />
            <div className="bg-gray-200 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Humidity</h2>
              <p className="text-xl font-bold">{user.humidity}%</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Total Consumption</h2>
              <p className="text-xl font-bold">{user.totalConsumption} kWh</p>
              <p className="text-sm text-gray-600">Cost: ${user.totalConsumption * 0.12}/hr</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <LightingControl intensity={user.lighting.intensity} />
            <ThermostatControl temperature={user.thermostat.temperature} />
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-4 mt-6">
        {filteredDevices.length > 0 ? (
          filteredDevices.map((device, index) => (
            <DeviceCard key={index} device={device} onClick={setSelectedDevice} />
          ))
        ) : (
          <p className="text-center text-gray-500">No devices found for this room.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
