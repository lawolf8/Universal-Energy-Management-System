import React from "react";

function DeviceCard({ name, status, image }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center">
      <img src={image} alt={name} className="w-16 h-16 mb-3" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className={`text-sm ${status === "On" ? "text-green-500" : "text-red-500"}`}>
        Status: {status}
      </p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 shadow-md">
        Toggle
      </button>
    </div>
  );
}

export default DeviceCard;