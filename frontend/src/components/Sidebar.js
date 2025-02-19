import React from "react";

const Sidebar = () => {
  return (
    <div className="w-1/6 bg-gray-900 text-white h-screen flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-6">Smart Home</h2>
      <ul className="w-full">
        {["Living Room", "Bedroom", "Kitchen", "Dining Room", "Play Room"].map((room, index) => (
          <li key={index} className="p-3 hover:bg-gray-700 rounded cursor-pointer text-center">
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
