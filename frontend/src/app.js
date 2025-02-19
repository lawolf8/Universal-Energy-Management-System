import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "tailwindcss/tailwind.css";
import userData from "./utils/userData";

function App() {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <Dashboard user={userData} />
      </div>
    );
  }
  
export default App;
  