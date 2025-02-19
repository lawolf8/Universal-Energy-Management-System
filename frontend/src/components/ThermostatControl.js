import React from "react";

const ThermostatControl = ({ temperature }) => {
  return (
    <div className="bg-red-200 p-4 rounded-lg shadow text-center">
      <h2 className="text-lg font-semibold mb-2">Thermostat</h2>
      <p className="text-xl font-bold">{temperature}°C</p>
    </div>
  );
};

export default ThermostatControl;