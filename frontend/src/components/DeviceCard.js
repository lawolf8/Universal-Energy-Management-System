import React from "react";
import lightbulb from "../assets/images/lightbulb.png";
import noniot from "../assets/images/noniot.png";
import television from "../assets/images/television.png";
import fridge from "../assets/images/fridge.png";

const deviceImages = {
  "Smart Light": lightbulb,
  "Television": television,
  "Fridge": fridge
};

function DeviceCard({ device, onClick }) {
  return (
    <div
      className="bg-gray-200 p-4 rounded-lg shadow cursor-pointer flex flex-col items-center"
      onClick={() => onClick(device)}
    >
      <img
        src={deviceImages[device.name] || noniot}
        alt={device.name}
        className="w-16 h-16 mb-2"
      />
      <h3 className="text-lg font-semibold">{device.name}</h3>
      <p className={`text-sm ${device.status === "On" ? "text-green-500" : "text-red-500"}`}>
        Status: {device.status}
      </p>
      <p className="text-sm text-gray-600">Room: {device.room}</p>
    </div>
  );
}

export default DeviceCard;
