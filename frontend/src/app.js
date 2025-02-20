import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./index.css";

function App() {
  const user = {
    name: "Albert",
    weather: "Rainy, 19°C",
    humidity: 65,
    totalConsumption: 160,
    lighting: { intensity: "80%" },
    thermostat: { temperature: 25 },
    devices: [
      { name: "Smart Light", status: "On" },
      { name: "Air Conditioner", status: "Off" },
      { name: "Door Lock", status: "Locked" },
      { name: "Cleaning Vacuum", status: "Off" }
    ]
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className="w-1/8" />
      <main className="flex-grow p-6">
        <Dashboard user={user} />
      </main>
    </div>
  );
}

export default App;