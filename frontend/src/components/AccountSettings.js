import React, { useState } from "react";

function AccountSettings({
  setShowAccountSettings,
  userData = {
    account: {
      firstName: "",
      lastName: "",
      emails: [""],
      phoneNumbers: [""],
      address: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        zipCode: ""
      }
    },
    devices: []
  }
}) {
  const [selectedTimes, setSelectedTimes] = useState({});
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [selectionValue, setSelectionValue] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alwaysOnDevices, setAlwaysOnDevices] = useState([]);
  const [searchType, setSearchType] = useState("name"); // Added search type state

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  // Merged filter function to handle both name and ID search while excluding already selected devices
  const filteredDevices = userData.devices.filter(device => {
    const isNotAlreadySelected = !alwaysOnDevices.some(d => d.id === device.id);
    if (!searchTerm) return isNotAlreadySelected;
    if (searchType === "id") {
      return device.id.toString() === searchTerm && isNotAlreadySelected;
    } else {
      return device.name.toLowerCase().includes(searchTerm.toLowerCase()) && isNotAlreadySelected;
    }
  });

  // Add device to always-on list
  const addDevice = (device) => {
    setAlwaysOnDevices(prev => [...prev, device]);
    setSearchTerm("");
  };

  // Remove device from always-on list
  const removeDevice = (deviceId) => {
    setAlwaysOnDevices(prev => prev.filter(d => d.id !== deviceId));
  };

  // Helper function to get cell coordinates
  const getCellCoordinates = (day, hour) => {
    const dayIndex = daysOfWeek.indexOf(day);
    const hourIndex = hours.indexOf(hour);
    return { dayIndex, hourIndex };
  };

  // Helper function to check if a cell is within selection range
  const isCellInRange = (day, hour, start, end) => {
    if (!start || !end) return false;

    const cell = getCellCoordinates(day, hour);
    const startCoords = getCellCoordinates(start.day, start.hour);
    const endCoords = getCellCoordinates(end.day, end.hour);

    const minDayIndex = Math.min(startCoords.dayIndex, endCoords.dayIndex);
    const maxDayIndex = Math.max(startCoords.dayIndex, endCoords.dayIndex);
    const minHourIndex = Math.min(startCoords.hourIndex, endCoords.hourIndex);
    const maxHourIndex = Math.max(startCoords.hourIndex, endCoords.hourIndex);

    return (
      cell.dayIndex >= minDayIndex &&
      cell.dayIndex <= maxDayIndex &&
      cell.hourIndex >= minHourIndex &&
      cell.hourIndex <= maxHourIndex
    );
  };

  // Handle mouse down to start selection
  const handleMouseDown = (day, hour) => {
    setIsSelecting(true);
    setSelectionStart({ day, hour });
    setCurrentSelection({ day, hour });
    const currentValue = selectedTimes[day]?.[hour] || false;
    setSelectionValue(!currentValue);
    setSelectedTimes(prev => {
      const updated = { ...prev };
      if (!updated[day]) updated[day] = {};
      updated[day][hour] = !currentValue;
      return updated;
    });
  };

  // Handle mouse enter while selecting
  const handleMouseEnter = (day, hour) => {
    if (isSelecting) {
      setCurrentSelection({ day, hour });
    }
  };

  // Handle mouse up to end selection
  const handleMouseUp = () => {
    if (isSelecting && selectionStart && currentSelection) {
      const updatedTimes = { ...selectedTimes };
      daysOfWeek.forEach(day => {
        hours.forEach(hour => {
          if (isCellInRange(day, hour, selectionStart, currentSelection)) {
            if (!updatedTimes[day]) updatedTimes[day] = {};
            updatedTimes[day][hour] = selectionValue;
          }
        });
      });
      setSelectedTimes(updatedTimes);
    }
    setIsSelecting(false);
    setSelectionStart(null);
    setCurrentSelection(null);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      {/* Back Button */}
      <button
        className="bg-gray-500 text-white p-2 rounded mb-4"
        onClick={() => setShowAccountSettings(false)}
      >
        Back
      </button>

      {/* Header */}
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">First Name:</label>
          <input 
            type="text" 
            className="p-2 border rounded w-full mb-2"
            defaultValue={userData.account.firstName}
          />

          <label className="block mb-2">Last Name:</label>
          <input 
            type="text" 
            className="p-2 border rounded w-full mb-2"
            defaultValue={userData.account.lastName}
          />

          <label className="block mb-2">Email:</label>
          <input 
            type="email" 
            className="p-2 border rounded w-full mb-2"
            defaultValue={userData.account.emails[0]}
          />

          <label className="block mb-2">Phone Number:</label>
          <input 
            type="text" 
            className="p-2 border rounded w-full mb-2"
            defaultValue={userData.account.phoneNumbers[0]}
          />
        </div>

        {/* Address Section */}
        <div>
          <label className="block mb-2">Address Line 1:</label>
          <input 
            type="text" 
            className="p-2 border rounded w-full mb-2"
            defaultValue={userData.account.address.line1}
          />

          <label className="block mb-2">Address Line 2:</label>
          <input 
            type="text" 
            className="p-2 border rounded w-full mb-2"
            defaultValue={userData.account.address.line2}
          />

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block mb-2">City:</label>
              <input 
                type="text" 
                className="p-2 border rounded w-full mb-2"
                defaultValue={userData.account.address.city}
              />
            </div>
            <div>
              <label className="block mb-2">State:</label>
              <input 
                type="text" 
                className="p-2 border rounded w-full mb-2"
                defaultValue={userData.account.address.state}
              />
            </div>
            <div>
              <label className="block mb-2">Zip Code:</label>
              <input 
                type="text" 
                className="p-2 border rounded w-full mb-2"
                defaultValue={userData.account.address.zipCode}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Work Schedule Table */}
      <h3 className="text-xl font-semibold mt-6 mb-2">
        Away From Home Schedule (Click and Drag to Select):
      </h3>
      {/* Removed overflow-auto from this container */}
      <div 
        className="bg-gray-200 p-4 rounded-lg"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <p className="mb-2">
          Click and drag to select/unselect multiple hours when you are not home.
        </p>
        <div className="grid grid-cols-8 gap-2">
          <div></div>
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center font-bold">
              {day}
            </div>
          ))}
        </div>

        {hours.map((hour, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-8 gap-2 mt-1">
            <div className="font-bold text-center">{hour}</div>
            {daysOfWeek.map((day, colIndex) => {
              const isSelected = selectedTimes[day]?.[hour] || false;
              const isInSelectionRange =
                isSelecting &&
                isCellInRange(day, hour, selectionStart, currentSelection);
              return (
                <div
                  key={`${day}-${hour}`}
                  className={`border p-2 text-center cursor-pointer select-none
                    ${isSelected ? "bg-red-500 text-white" : "hover:bg-gray-300"}
                    ${isInSelectionRange ? "bg-red-300" : ""}`}
                  onMouseDown={() => handleMouseDown(day, hour)}
                  onMouseEnter={() => handleMouseEnter(day, hour)}
                >
                  {hour}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Always-On Devices Section */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Always-On Devices:</h3>
      <div className="grid grid-cols-2 gap-4 bg-gray-200 p-4 rounded-lg">
        {/* Search and Add Section */}
        <div>
          <div className="mb-4 flex gap-2">
            <select
              className="p-2 border rounded"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="name">Search by Name</option>
              <option value="id">Search by ID</option>
            </select>
            <input
              type="text"
              placeholder={
                searchType === "id" ? "Enter device ID..." : "Search devices..."
              }
              className="p-2 border rounded w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="bg-white rounded-lg p-2 max-h-64 overflow-y-auto">
            {filteredDevices.map(device => (
              <div
                key={device.id}
                className="flex justify-between items-center p-2 hover:bg-gray-100 rounded"
              >
                <div>
                  <p className="font-semibold">
                    {device.name} (ID: {device.id})
                  </p>
                  <p className="text-sm text-gray-600">{device.room}</p>
                </div>
                <button
                  onClick={() => addDevice(device)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            ))}
            {searchTerm && filteredDevices.length === 0 && (
              <p className="text-gray-500 text-center p-2">No devices found</p>
            )}
          </div>
        </div>

        {/* Selected Devices Table */}
        <div>
          <div className="bg-white rounded-lg p-2 h-full">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Device</th>
                  <th className="text-left p-2">Room</th>
                  <th className="text-left p-2">Power</th>
                  <th className="text-right p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {alwaysOnDevices.map(device => (
                  <tr key={device.id} className="border-b">
                    <td className="p-2">{device.name}</td>
                    <td className="p-2">{device.room}</td>
                    <td className="p-2">{device.watts}W</td>
                    <td className="p-2 text-right">
                      <button
                        onClick={() => removeDevice(device.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {alwaysOnDevices.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">
                      No devices selected
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        className="bg-green-500 text-white p-2 rounded mt-4 w-full"
        onClick={() => {
          console.log("Saving changes", {
            schedule: selectedTimes,
            alwaysOnDevices
          });
        }}
      >
        Save Changes
      </button>
    </div>
  );
}

export default AccountSettings;
