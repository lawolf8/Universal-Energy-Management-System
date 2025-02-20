import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AccountSettings from "./components/AccountSettings";
import userData from "./utils/userData";
import "./index.css";

function App() {
  const [rooms, setRooms] = useState([
    { name: "Living Room" },
    { name: "Bedroom" },
    { name: "Kitchen" },
    { name: "Dining Room" },
    { name: "Play Room" }
  ]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const addRoom = () => {
    const roomName = prompt("Enter the new room name:");
    if (roomName) {
      setRooms([...rooms, { name: roomName }]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar
        rooms={rooms}
        addRoom={addRoom}
        setSelectedRoom={(room) => {
          setShowAccountSettings(false);
          setSelectedRoom(room);
        }}
        setShowAccountSettings={() => {
          setShowAccountSettings(true);
          setSelectedRoom(null);
        }}
        goHome={() => {
          setSelectedRoom(null);
          setShowAccountSettings(false);
        }}
      />
      <main className="flex-grow p-6 overflow-auto">
        {showAccountSettings ? (
          <AccountSettings account={userData.account} />
        ) : (
          <Dashboard
            user={userData}
            selectedRoom={selectedRoom}
            setSelectedDevice={setSelectedDevice}
          />
        )}
      </main>
    </div>
  );
}

export default App;
