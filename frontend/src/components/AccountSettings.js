import React, { useState } from "react";

function AccountSettings() {
  const [workHours, setWorkHours] = useState([]);

  return (
    <div className="p-6 bg-white rounded shadow-md overflow-auto h-full">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">First Name:</label>
          <input type="text" className="p-2 border rounded w-full mb-2" />
          <label className="block mb-2">Last Name:</label>
          <input type="text" className="p-2 border rounded w-full mb-2" />
          <label className="block mb-2">Email:</label>
          <input type="email" className="p-2 border rounded w-full mb-2" />
          <label className="block mb-2">Phone Number:</label>
          <input type="text" className="p-2 border rounded w-full mb-2" />
        </div>
        <div>
          <label className="block mb-2">Address Line 1:</label>
          <input type="text" className="p-2 border rounded w-full mb-2" />
          <label className="block mb-2">Address Line 2:</label>
          <input type="text" className="p-2 border rounded w-full mb-2" />
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block mb-2">City:</label>
              <input type="text" className="p-2 border rounded w-full mb-2" />
            </div>
            <div>
              <label className="block mb-2">State:</label>
              <input type="text" className="p-2 border rounded w-full mb-2" />
            </div>
            <div>
              <label className="block mb-2">Zip Code:</label>
              <input type="text" className="p-2 border rounded w-full mb-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;