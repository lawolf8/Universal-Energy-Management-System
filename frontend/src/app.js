import React, { useState, useEffect } from 'react';
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AccountSettings from "./components/AccountSettings";
import DevicePopup from "./components/DevicePopup";
import userData from "./utils/userData";
import "./index.css";
import "./pulse-theme.css";
import Header from './components/Header';

function App() {
  const [rooms, setRooms] = useState([
    { name: "Living Room", icon: "Living Room" },
    { name: "Bedroom", icon: "Bedroom" },
    { name: "Kitchen", icon: "Kitchen" },
    { name: "Dining Room", icon: "Dining Room" },
    { name: "Play Room", icon: "Play Room" }
  ]);
  
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const addRoom = (roomData) => {
    setRooms(prevRooms => [...prevRooms, {
      name: roomData.name,
      icon: roomData.icon,
      notes: roomData.notes
    }]);
  };

  const goHome = () => {
    setSelectedRoom(null);
    setShowAccountSettings(false);
  };

  // Function to handle room selection
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setShowAccountSettings(false);
  };

  // Function to handle account settings
  const handleAccountSettings = () => {
    setShowAccountSettings(true);
    setSelectedRoom(null);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar 
        rooms={rooms} 
        addRoom={addRoom} 
        setSelectedRoom={handleRoomSelect}
        setShowAccountSettings={handleAccountSettings}
        goHome={goHome}
      />
      <main className="flex-grow p-6 overflow-auto relative">
        {showAccountSettings ? (
          <AccountSettings 
            setShowAccountSettings={setShowAccountSettings} 
            userData={userData}
            rooms={rooms}
          />
        ) : (
          <Dashboard 
            user={userData} 
            selectedRoom={selectedRoom} 
            setSelectedDevice={setSelectedDevice} 
          />
        )}
        {selectedDevice && (
          <DevicePopup 
            device={selectedDevice} 
            setSelectedDevice={setSelectedDevice} 
            rooms={rooms} 
          />
        )}
      </main>
    </div>
  );
}

export default App;