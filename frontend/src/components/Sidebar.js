import React from "react";
import { FaCouch, FaBed, FaUtensils, FaChair, FaGamepad, FaPlus, FaUserCog } from "react-icons/fa";

const roomIcons = {
  "Living Room": <FaCouch />,
  "Bedroom": <FaBed />,
  "Kitchen": <FaUtensils />,
  "Dining Room": <FaChair />,
  "Play Room": <FaGamepad />
};

const Sidebar = ({ rooms, addRoom, setSelectedRoom, setShowAccountSettings, goHome }) => {
  return (
    <div className="w-1/8 bg-gray-900 text-white h-screen flex flex-col">
      <h2 className="text-xl font-bold p-4">Smart Home</h2>
      <nav className="flex-grow">
        <button
          className="block px-4 py-2 text-left w-full hover:bg-gray-700 font-bold flex items-center"
          onClick={goHome}
        >
          🏠 Home
        </button>
        {rooms.map((room, index) => (
          <button
            key={index}
            className="block px-4 py-2 text-left w-full hover:bg-gray-700 flex items-center"
            onClick={() => setSelectedRoom(room)}
          >
            {roomIcons[room.name] || "🏠"} <span className="ml-2">{room.name}</span>
          </button>
        ))}
        <button
          className="block px-4 py-2 text-left text-blue-400 hover:text-blue-600 flex items-center"
          onClick={addRoom}
        >
          <FaPlus className="mr-2" /> Add Room
        </button>
      </nav>
      <button
        className="p-4 bg-gray-800 text-white w-full hover:bg-gray-700 flex items-center"
        onClick={setShowAccountSettings}
      >
        <FaUserCog className="mr-2" /> Account Settings
      </button>
    </div>
  );
};

export default Sidebar;
