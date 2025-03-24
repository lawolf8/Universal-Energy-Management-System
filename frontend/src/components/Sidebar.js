import React, { useState } from "react";
import { 
  FaCouch, FaBed, FaUtensils, FaChair, FaGamepad, 
  FaPlus, FaUserCog, FaEllipsisV 
} from "react-icons/fa";
import AddRoomPopup from "./AddRoomPopup";
import '../pulse-theme.css';

const roomIcons = {
  "Living Room": <FaCouch />,
  "Bedroom": <FaBed />,
  "Kitchen": <FaUtensils />,
  "Dining Room": <FaChair />,
  "Play Room": <FaGamepad />
};

const Sidebar = ({ 
  rooms, 
  addRoom, 
  setSelectedRoom, 
  goHome,
  // Callback for room removal and updating. Customize as needed.
  onRemoveRoom = room => console.log("Remove Room", room),
  onUpdateRoom = updatedRoom => console.log("Update Room", updatedRoom)
}) => {
  const [showAddRoomPopup, setShowAddRoomPopup] = useState(false);

  const handleAddRoom = (roomData) => {
    const newRoom = {
      name: roomData.name,
      icon: roomData.icon,
      notes: roomData.notes
    };
    addRoom(newRoom);
  };

  // The RoomSettingsPopup component with updated colors
  const RoomSettingsPopup = ({ room, onClose }) => {
    const [roomName, setRoomName] = useState(room.name);
    const [roomOn, setRoomOn] = useState(room.on ?? true);
    const [notes, setNotes] = useState(room.notes || "");

    const handleSave = () => {
      const updatedRoom = {
        ...room,
        name: roomName,
        on: roomOn,
        notes,
      };
      onUpdateRoom(updatedRoom);
      onClose();
    };

    return (
      <div className="absolute left-full top-0 ml-2 w-64 bg-white text-black p-4 rounded shadow-lg z-30 border border-gray-300">
        {/* Editable Room Name */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1 text-gray-700">Room Name</label>
          <input 
            type="text" 
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* On/Off Switch */}
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-bold mr-2 text-gray-700">Room Status</label>
          <button 
            onClick={() => setRoomOn(prev => !prev)}
            className={`px-3 py-1 rounded ${roomOn ? "bg-green-600 text-white" : "bg-gray-300 text-black"}`}
          >
            {roomOn ? "On" : "Off"}
          </button>
        </div>
        {/* Remove Button */}
        <div className="mb-4">
          <button 
            onClick={() => {
              onRemoveRoom(room);
              onClose();
            }}
            className="bg-red-500 text-white w-full px-3 py-2 rounded hover:bg-red-600"
          >
            Remove Room
          </button>
        </div>
        {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1 text-gray-700">Notes</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
        {/* Save and Close Buttons */}
        <div className="flex justify-end space-x-2">
          <button 
            onClick={handleSave}
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button 
            onClick={onClose}
            className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  // Each room is rendered here with a triple-dot button that triggers the popup.
  const RoomItem = ({ room }) => {
    const [popupOpen, setPopupOpen] = useState(false);

    return (
      <div className="relative flex items-center">
        <button
          className="flex-1 block px-4 py-2 text-left w-full hover:bg-gray-700 flex items-center"
          onClick={() => setSelectedRoom(room)}
        >
          {roomIcons[room.name] || "🏠"} <span className="ml-2">{room.name}</span>
        </button>
        <button
          className="p-2 hover:bg-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            setPopupOpen(true);
          }}
        >
          <FaEllipsisV />
        </button>
        {popupOpen && (
          <RoomSettingsPopup 
            room={room} 
            onClose={() => setPopupOpen(false)} 
          />
        )}
      </div>
    );
  };

  return (
    <div className="w-1/8 bg-gray-800 text-white h-screen flex flex-col">
      <h2 className="text-xl font-bold p-4 border-b border-gray-700">Pulse Home</h2>
      <nav className="flex-grow">
        <button
          className="block px-4 py-2 text-left w-full hover:bg-gray-700 flex items-center font-bold"
          onClick={goHome}
        >
          🏠 Home
        </button>
        {rooms.map((room, index) => (
          <RoomItem key={index} room={room} />
        ))}
        <button
          className="block px-4 py-2 text-left text-pulse-accent hover:text-white flex items-center"
          onClick={() => setShowAddRoomPopup(true)}
        >
          <FaPlus className="mr-2" /> Add Room
        </button>
      </nav>

      {showAddRoomPopup && (
        <AddRoomPopup
          onClose={() => setShowAddRoomPopup(false)}
          onAdd={handleAddRoom}
        />
      )}
    </div>
  );
};

export default Sidebar;
