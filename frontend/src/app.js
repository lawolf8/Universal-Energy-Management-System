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
      { name: "Smart Light", status: "On", image: require("./assets/images/lightbulb.png") },
      { name: "Air Conditioner", status: "Off", image: require("./assets/images/speaker.png") },
      { name: "Door Lock", status: "Locked", image: require("./assets/images/fridge.png") },
      { name: "Cleaning Vacuum", status: "Off", image: require("./assets/images/dryer.png") },
      { name: "Unknown Device", status: "N/A", image: require("./assets/images/noniot.png") }
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