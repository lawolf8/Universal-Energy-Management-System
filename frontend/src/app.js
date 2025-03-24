import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AccountSettings from "./components/AccountSettings";
import DevicePopup from "./components/DevicePopup";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from './context/AuthContext';
import userData from "./utils/userData";
import "./index.css";
import "./pulse-theme.css";
import Header from './components/Header';

// Main application component that handles routing
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const [rooms, setRooms] = useState([
    { name: "Living Room", icon: "Living Room" },
    { name: "Bedroom", icon: "Bedroom" },
    { name: "Kitchen", icon: "Kitchen" },
    { name: "Dining Room", icon: "Dining Room" },
    { name: "Play Room", icon: "Play Room" }
  ]);
  
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState("profile");
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
  const handleAccountSettings = (show = true, tab = "profile") => {
    setShowAccountSettings(show);
    setActiveSettingsTab(tab);
    if (show) {
      setSelectedRoom(null);
    }
  };

  // Main app layout with sidebar for authenticated users
  const MainLayout = () => (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar 
        rooms={rooms} 
        addRoom={addRoom} 
        setSelectedRoom={handleRoomSelect}
        goHome={goHome}
      />
      <div className="flex flex-col flex-grow">
        <Header 
          title={selectedRoom ? selectedRoom.name : (showAccountSettings ? "Account Settings" : "Dashboard")} 
          setShowAccountSettings={handleAccountSettings}
        />
        <main className="flex-grow p-6 overflow-auto relative">
          {showAccountSettings ? (
            <AccountSettings 
              setShowAccountSettings={setShowAccountSettings} 
              userData={userData}
              rooms={rooms}
              activeTab={activeSettingsTab}
              setActiveTab={setActiveSettingsTab}
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
    </div>
  );

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Root component wrapping the app with necessary providers
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;