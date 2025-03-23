// DevicePopup.jsx

import React, { useState } from "react";
import lightbulb from "../assets/images/lightbulb.png";
import noniot from "../assets/images/noniot.png";
import television from "../assets/images/television.png";
import fridge from "../assets/images/fridge.png";

const deviceImages = {
  "Smart Light": lightbulb,
  "Television": television,
  "Fridge": fridge
};

function DevicePopup({ device = {}, setSelectedDevice, rooms = [] }) {
  const {
    name = "",
    id = "",
    watts = 0,
    cost = 0,
    room = "",
    // If your device object can contain notes from the server, uncomment:
    // notes: initialNotes = ""
  } = device;

  const [deviceName, setDeviceName] = useState(name);
  const [selectedRoom, setSelectedRoom] = useState(room);
  const [activeTab, setActiveTab] = useState("details");
  const [timeRange, setTimeRange] = useState("day");

  // If you want to initialize with device.notes:
  // const [notes, setNotes] = useState(initialNotes);
  const [notes, setNotes] = useState("");

  if (!device) {
    return null;
  }

  // Handle Save
  const handleSave = () => {
    // Implement your save logic here (e.g., call an API or update parent state)
    // Example:
    // const updatedDevice = {
    //   ...device,
    //   name: deviceName,
    //   room: selectedRoom,
    //   notes
    // };
    // saveDeviceToServer(updatedDevice).then(() => setSelectedDevice(null));

    console.log("Saving device changes:", {
      deviceName,
      selectedRoom,
      notes,
    });
    // Close the popup after saving
    setSelectedDevice(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Device Header */}
        <div className="flex items-start mb-6">
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
            <img 
              src={deviceImages[name] || noniot}
              alt={name} 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-600">ID: {id}</p>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="w-full">
          <div className="flex border-b mb-4">
            <button
              className={`px-4 py-2 ${
                activeTab === "details"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Device Details
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "usage"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("usage")}
            >
              Usage Analytics
            </button>
          </div>

          {/* Details Tab Content */}
          {activeTab === "details" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Device Name</label>
                <input
                  type="text"
                  className="p-2 border rounded w-full"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Power Usage</label>
                  <p className="p-2">{watts} W</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Cost per kWh</label>
                  <p className="p-2">${cost.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Room</label>
                <select 
                  className="p-2 border rounded w-full"
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                >
                  {rooms.map((room, index) => (
                    <option key={index} value={room.name || ""}>
                      {room.name || "Unknown Room"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Usage Tab Content */}
          {activeTab === "usage" && (
            <div className="bg-white rounded">
              <div className="mb-4">
                <div className="flex space-x-2 mb-4">
                  {["day", "week", "month", "year"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 rounded ${
                        timeRange === range
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Usage chart will be displayed here</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notes Section + Save/Close Buttons */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            className="p-2 border rounded w-full"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => setSelectedDevice(null)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DevicePopup;
