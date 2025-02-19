import React from "react";

const LightingControl = ({ intensity }) => {
  return (
    <div className="bg-yellow-200 p-4 rounded-lg shadow text-center">
      <h2 className="text-lg font-semibold mb-2">Lighting Control</h2>
      <p className="text-xl font-bold">{intensity}% Intensity</p>
    </div>
  );
};

export default LightingControl;