import React, { useState } from 'react';
import { 
  FaCouch, FaBed, FaUtensils, FaChair, FaGamepad, 
  FaDesktop, FaBath, FaCar, FaBook, FaDumbbell 
} from 'react-icons/fa';

const roomIcons = {
  "Living Room": { icon: <FaCouch />, label: "Living Room" },
  "Bedroom": { icon: <FaBed />, label: "Bedroom" },
  "Kitchen": { icon: <FaUtensils />, label: "Kitchen" },
  "Dining Room": { icon: <FaChair />, label: "Dining Room" },
  "Play Room": { icon: <FaGamepad />, label: "Play Room" },
  "Office": { icon: <FaDesktop />, label: "Office" },
  "Bathroom": { icon: <FaBath />, label: "Bathroom" },
  "Garage": { icon: <FaCar />, label: "Garage" },
  "Library": { icon: <FaBook />, label: "Library" },
  "Gym": { icon: <FaDumbbell />, label: "Gym" }
};

function AddRoomPopup({ onClose, onAdd }) {
  const [roomName, setRoomName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [notes, setNotes] = useState("");
  const [customName, setCustomName] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalRoomName = isCustom ? customName : roomName;
    if (finalRoomName && selectedIcon) {
      onAdd({
        name: finalRoomName,
        icon: selectedIcon,
        notes: notes
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Room</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Room Selection or Custom Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Room Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsCustom(false)}
                className={`px-4 py-2 rounded-lg ${
                  !isCustom ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                Preset Rooms
              </button>
              <button
                type="button"
                onClick={() => setIsCustom(true)}
                className={`px-4 py-2 rounded-lg ${
                  isCustom ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                Custom Room
              </button>
            </div>
          </div>

          {/* Room Name Input (Preset or Custom) */}
          {isCustom ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Room Name
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room name..."
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Room
              </label>
              <select
                value={roomName}
                onChange={(e) => {
                  setRoomName(e.target.value);
                  setSelectedIcon(e.target.value);
                }}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a room...</option>
                {Object.entries(roomIcons).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(roomIcons).map(([key, { icon }]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedIcon(key)}
                  className={`p-3 rounded-lg ${
                    selectedIcon === key
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Add any notes about this room..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={(!isCustom && !roomName) || (isCustom && !customName) || !selectedIcon}
            >
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRoomPopup; 