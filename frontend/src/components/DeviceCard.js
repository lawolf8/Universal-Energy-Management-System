import React from "react";

const DeviceCard = ({ name }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow text-center">
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <button className="mt-2 p-2 bg-blue-500 text-white rounded">Toggle</button>
    </div>
  );
};

export default DeviceCard;