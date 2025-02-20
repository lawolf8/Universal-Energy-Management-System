import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = Array.from({ length: 24 * 4 }, (_, i) => `${Math.floor(i / 4)}:${(i % 4) * 15 === 0 ? "00" : (i % 4) * 15}`);

function AccountSettings() {
  const [schedule, setSchedule] = useState([]);

  const onLayoutChange = (newLayout) => {
    setSchedule(newLayout);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

      <label className="block mb-2">First Name:</label>
      <input type="text" className="p-2 border rounded w-full mb-2" />
      
      <label className="block mb-2">Last Name:</label>
      <input type="text" className="p-2 border rounded w-full mb-2" />
      
      <label className="block mb-2">Email:</label>
      <input type="email" className="p-2 border rounded w-full mb-2" />

      <label className="block mb-2">Work Schedule (Drag to Select):</label>
      <div className="border p-4 overflow-auto">
        <GridLayout
          className="layout"
          layout={schedule}
          cols={7}
          rowHeight={30}
          width={700}
          onLayoutChange={onLayoutChange}
        >
          {schedule.map((slot) => (
            <div key={slot.i} className="bg-blue-400 text-white flex justify-center items-center">
              {timeSlots[slot.y]}
            </div>
          ))}
        </GridLayout>
      </div>

      <label className="block mt-4">Alerts:</label>
      <div>
        <input type="checkbox" className="mr-2" /> High Energy Usage Alert
      </div>
      <div>
        <input type="checkbox" className="mr-2" /> Power Outage Alert
      </div>
      <div>
        <input type="checkbox" className="mr-2" /> Monthly Cost Alert
      </div>
      <div>
        <input type="checkbox" className="mr-2" /> Monthly Savings Alert
      </div>
    </div>
  );
}

export default AccountSettings;
