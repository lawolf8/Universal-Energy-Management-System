import React, { useState } from "react";

function DevicePopup({ device, setSelectedDevice, rooms }) {
  const [deviceName, setDeviceName] = useState(device.name);
  const [selectedRoom, setSelectedRoom] = useState(device.room);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 flex">
        <img src={device.image} alt={device.name} className="w-32 h-32 mr-4" onError={(e) => e.target.src = "/assets/images/noniot.png"} />
        <div>
          <h2 className="text-2xl font-bold mb-4">Device Details</h2>
          <label className="block mb-2">Device Name:</label>
          <input
            type="text"
            className="p-2 border rounded w-full mb-2"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <p><strong>Device ID:</strong> {device.id}</p>
          <p><strong>Power Usage:</strong> {device.watts} W</p>
          <p><strong>Cost per kWh:</strong> ${device.cost.toFixed(2)}</p>
          <label className="block mt-4">Room:</label>
          <select className="p-2 border rounded w-full mb-2" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
            {rooms.map((room, index) => (
              <option key={index} value={room.name}>{room.name}</option>
            ))}
          </select>
          <button className="bg-red-500 text-white p-2 rounded w-full" onClick={() => setSelectedDevice(null)}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default DevicePopup;