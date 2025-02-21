import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./app"; // THE ERROR IS WHEN /app is lowercase, it should be /App
import "./index.css"; // Ensure Tailwind CSS is applied

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;