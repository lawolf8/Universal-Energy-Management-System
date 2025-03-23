import React, { useState } from "react";
import { FaUser, FaClock, FaPlug, FaSave, FaArrowLeft, FaPlusCircle, FaHeadset, FaTimes } from "react-icons/fa";

function AccountSettings({
  setShowAccountSettings,
  rooms = [],
  userData = {
    account: {
      firstName: "Jane",
      lastName: "Doe",
      emails: ["jane.doe@example.com"],
      phoneNumbers: ["555-123-4567"],
      address: {
        line1: "123 Main St",
        line2: "Apt 4B",
        city: "Anytown",
        state: "CA",
        zipCode: "90210"
      }
    },
    devices: [
      {
        id: "device-1",
        name: "Living Room Light",
        type: "lighting",
        room: "Living Room",
        brand: "Phillips",
        model: "Hue A19",
        status: "On",
        watts: 9
      },
      {
        id: "device-2",
        name: "Kitchen Thermostat",
        type: "thermostat",
        room: "Kitchen",
        brand: "Nest",
        model: "Learning Thermostat",
        status: "On",
        watts: 4
      }
    ]
  }
}) {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedTimes, setSelectedTimes] = useState({});
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [selectionValue, setSelectionValue] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alwaysOnDevices, setAlwaysOnDevices] = useState([]);
  const [searchType, setSearchType] = useState("name");
  const [formData, setFormData] = useState({
    firstName: userData.account?.firstName || "",
    lastName: userData.account?.lastName || "",
    email: userData.account?.emails?.[0] || "",
    phone: userData.account?.phoneNumbers?.[0] || "",
    street: userData.account?.address?.line1 || "",
    city: userData.account?.address?.city || "",
    state: userData.account?.address?.state || "",
    zipCode: userData.account?.address?.zipCode || ""
  });
  
  // Schedule settings state
  const [scheduleSettings, setScheduleSettings] = useState({
    energySaving: false,
    schedules: [
      {
        id: 1,
        awayTimeStart: "09:00",
        awayTimeEnd: "17:00",
        awayDays: ["Mon", "Tue", "Wed", "Thu", "Fri"]
      }
    ],
    nightMode: false,
    nightTimeStart: "22:00",
    nightTimeEnd: "06:00",
    nightBrightness: 30
  });

  // User devices state
  const [userDevices, setUserDevices] = useState(userData.devices || []);
  const [isEditingDevice, setIsEditingDevice] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [editingDeviceIndex, setEditingDeviceIndex] = useState(null);
  const [ignoredDevices, setIgnoredDevices] = useState([]);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  
  // Common IoT brands for dropdown
  const commonIoTBrands = [
    "Samsung",
    "LG",
    "GE",
    "Philips Hue",
    "Amazon",
    "Google",
    "Apple",
    "Nest",
    "Ecobee",
    "Ring",
    "Arlo",
    "TP-Link",
    "Wyze",
    "Honeywell",
    "Custom"
  ];
  
  // Device types for dropdown
  const deviceTypes = [
    "Light",
    "Thermostat",
    "Lock",
    "Camera",
    "Speaker",
    "TV",
    "Refrigerator",
    "Washer",
    "Dryer",
    "Dishwasher",
    "Oven",
    "Microwave",
    "Air Conditioner",
    "Fan",
    "Vacuum",
    "Other"
  ];
  
  // New device state
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "",
    room: rooms.length > 0 ? rooms[0].name : "Living Room",
    brand: "",
    customBrand: "",
    model: "",
    isIoT: true
  });

  // Support form state
  const [supportForm, setSupportForm] = useState({
    category: "",
    description: "",
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    consent: true
  });

  // Handle editing a device
  const handleEditDevice = (index) => {
    setEditingDeviceIndex(index);
    // Make sure we initialize with defaults if any property is missing
    const device = userDevices[index] || {};
    setEditingDevice({
      id: device.id || `device-${Date.now()}`,
      name: device.name || "",
      type: device.type || "",
      room: device.room || (rooms.length > 0 ? rooms[0].name : "Living Room"),
      brand: device.brand || "",
      model: device.model || "",
      status: device.status || "Off",
      watts: device.watts || 0
    });
    setIsEditingDevice(true);
  };

  // Handle saving edited device
  const handleSaveEditDevice = (e) => {
    e.preventDefault();
    const updatedDevices = [...userDevices];
    updatedDevices[editingDeviceIndex] = editingDevice;
    setUserDevices(updatedDevices);
    setIsEditingDevice(false);
  };

  // Handle device field changes
  const handleEditDeviceChange = (e) => {
    setEditingDevice({
      ...editingDevice,
      [e.target.name]: e.target.value
    });
  };

  // Handle deleting a device
  const handleDeleteDevice = (index) => {
    const updatedDevices = userDevices.filter((_, i) => i !== index);
    setUserDevices(updatedDevices);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle new device form changes
  const handleNewDeviceChange = (e) => {
    setNewDevice({
      ...newDevice,
      [e.target.name]: e.target.value
    });
  };

  // Handle support form changes
  const handleSupportFormChange = (e) => {
    const { name, value, checked } = e.target;
    setSupportForm({
      ...supportForm,
      [name]: name === 'consent' ? checked : value
    });
  };

  // Handle adding a new device
  const handleAddDevice = (e) => {
    e.preventDefault();
    
    const brandValue = newDevice.brand === 'Custom' ? newDevice.customBrand : newDevice.brand;
    
    const deviceToAdd = {
      id: `device-${Date.now()}`,
      name: newDevice.name,
      type: newDevice.type,
      room: newDevice.room,
      brand: brandValue,
      model: newDevice.model,
      status: "Off",
      watts: Math.floor(Math.random() * 100) + 20
    };
    
    setUserDevices([...userDevices, deviceToAdd]);
    
    // Reset form
    setNewDevice({
      name: "",
      type: "",
      room: rooms.length > 0 ? rooms[0].name : "Living Room",
      brand: "",
      customBrand: "",
      model: "",
      isIoT: true
    });
    
    // Switch to devices tab
    setActiveTab("devices");
  };

  // Handle support form submission
  const handleSupportSubmit = (e) => {
    e.preventDefault();
    // Process support request
    console.log("Support request submitted:", supportForm);
    // Reset form
    setSupportForm({
      ...supportForm,
      category: "",
      description: ""
    });
    // Show confirmation (in a real app this would be a proper notification)
    alert("Your support request has been submitted. Our team will contact you soon!");
  };

  // Handle save button click
  const handleSave = () => {
    // Save all settings
    console.log("Saving user data:", {
      formData,
      scheduleSettings,
      userDevices
    });
    
    // In a real app, this would call an API to save the data
    
    // Close the settings modal
    setShowAccountSettings(false);
  };

  const filteredDevices = userDevices.filter(device => {
    const isNotAlreadySelected = !alwaysOnDevices.some(d => d.id === device.id);
    if (!searchTerm) return isNotAlreadySelected;
    
    // Apply search by name or ID
    if (searchType === "name") {
      return (
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        isNotAlreadySelected
      );
    } else if (searchType === "id") {
      return (
        device.id?.toLowerCase().includes(searchTerm.toLowerCase()) && 
        isNotAlreadySelected
      );
    }
    
    return isNotAlreadySelected;
  });

  const addDevice = (device) => {
    setAlwaysOnDevices(prev => [...prev, device]);
    setSearchTerm("");
  };

  const removeDevice = (deviceId) => {
    setAlwaysOnDevices(prev => prev.filter(d => d.id !== deviceId));
  };

  const getCellCoordinates = (day, hour) => {
    const dayIndex = daysOfWeek.indexOf(day);
    const hourIndex = hours.indexOf(hour);
    return { dayIndex, hourIndex };
  };

  const isCellInRange = (day, hour, start, end) => {
    if (!start || !end) return false;

    const cell = getCellCoordinates(day, hour);
    const startCoords = getCellCoordinates(start.day, start.hour);
    const endCoords = getCellCoordinates(end.day, end.hour);

    const minDayIndex = Math.min(startCoords.dayIndex, endCoords.dayIndex);
    const maxDayIndex = Math.max(startCoords.dayIndex, endCoords.dayIndex);
    const minHourIndex = Math.min(startCoords.hourIndex, endCoords.hourIndex);
    const maxHourIndex = Math.max(startCoords.hourIndex, endCoords.hourIndex);

    return (
      cell.dayIndex >= minDayIndex &&
      cell.dayIndex <= maxDayIndex &&
      cell.hourIndex >= minHourIndex &&
      cell.hourIndex <= maxHourIndex
    );
  };

  const handleMouseDown = (day, hour) => {
    setIsSelecting(true);
    setSelectionStart({ day, hour });
    setCurrentSelection({ day, hour });
    const currentValue = selectedTimes[day]?.[hour] || false;
    setSelectionValue(!currentValue);
    setSelectedTimes(prev => {
      const updated = { ...prev };
      if (!updated[day]) updated[day] = {};
      updated[day][hour] = !currentValue;
      return updated;
    });
  };

  const handleMouseEnter = (day, hour) => {
    if (isSelecting) {
      setCurrentSelection({ day, hour });
    }
  };

  const handleMouseUp = () => {
    if (isSelecting && selectionStart && currentSelection) {
      const updatedTimes = { ...selectedTimes };
      daysOfWeek.forEach(day => {
        hours.forEach(hour => {
          if (isCellInRange(day, hour, selectionStart, currentSelection)) {
            if (!updatedTimes[day]) updatedTimes[day] = {};
            updatedTimes[day][hour] = selectionValue;
          }
        });
      });
      setSelectedTimes(updatedTimes);
    }
    setIsSelecting(false);
    setSelectionStart(null);
    setCurrentSelection(null);
  };

  const addScheduleTime = () => {
    setScheduleSettings(prev => ({
      ...prev,
      schedules: [
        ...prev.schedules,
        {
          id: Date.now(),
          awayTimeStart: "12:00",
          awayTimeEnd: "14:00",
          awayDays: ["Mon", "Tue", "Wed", "Thu", "Fri"]
        }
      ]
    }));
  };

  const removeScheduleTime = (id) => {
    setScheduleSettings(prev => ({
      ...prev,
      schedules: prev.schedules.filter(schedule => schedule.id !== id)
    }));
  };

  const updateSchedule = (id, field, value) => {
    setScheduleSettings(prev => ({
      ...prev,
      schedules: prev.schedules.map(schedule => 
        schedule.id === id ? { ...schedule, [field]: value } : schedule
      )
    }));
  };

  const toggleIgnoreDevice = (deviceId) => {
    if (ignoredDevices.includes(deviceId)) {
      setIgnoredDevices(prev => prev.filter(id => id !== deviceId));
    } else {
      setIgnoredDevices(prev => [...prev, deviceId]);
    }
  };

  // Profile Tab
  const renderProfileTab = () => (
    <div>
      <h2 className="text-lg font-semibold mb-4">User Profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="pt-4">
          <label htmlFor="address" className="block text-lg font-medium text-gray-800 mb-2">
            Home Address
          </label>
          <div className="space-y-4">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  // Schedule Tab
  const renderScheduleTab = () => (
    <div>
      <h2 className="text-lg font-semibold mb-4">Schedule Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Energy Saving Schedule</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start mb-4">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-gray-800">Energy Saving Mode</div>
                <p className="text-sm text-gray-600">Automatically adjust devices to save energy when you're away</p>
              </div>
              <div className="ml-auto">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={scheduleSettings.energySaving} onChange={() => setScheduleSettings(prev => ({...prev, energySaving: !prev.energySaving}))} />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
            
            {scheduleSettings.energySaving && (
              <div className="space-y-6 border-t border-gray-200 pt-3">
                {scheduleSettings.schedules.map((schedule, index) => (
                  <div key={schedule.id} className="p-3 border border-gray-200 rounded-lg bg-white">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-700">Time Period {index + 1}</h4>
                      {scheduleSettings.schedules.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeScheduleTime(schedule.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label htmlFor={`awayTimeStart-${schedule.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Away Start Time
                        </label>
                        <input
                          type="time"
                          id={`awayTimeStart-${schedule.id}`}
                          value={schedule.awayTimeStart}
                          onChange={(e) => updateSchedule(schedule.id, 'awayTimeStart', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor={`awayTimeEnd-${schedule.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Away End Time
                        </label>
                        <input
                          type="time"
                          id={`awayTimeEnd-${schedule.id}`}
                          value={schedule.awayTimeEnd}
                          onChange={(e) => updateSchedule(schedule.id, 'awayTimeEnd', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Days of Week
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                          <button
                            key={day}
                            type="button"
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                              schedule.awayDays.includes(day)
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            onClick={() => {
                              const newDays = schedule.awayDays.includes(day)
                                ? schedule.awayDays.filter(d => d !== day)
                                : [...schedule.awayDays, day];
                              updateSchedule(schedule.id, 'awayDays', newDays);
                            }}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addScheduleTime}
                  className="w-full py-2 border border-dashed border-blue-500 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  + Add Another Time Period
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Night Mode Schedule</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-gray-800">Night Mode</div>
                <p className="text-sm text-gray-600">Dim lights and adjust thermostats during sleep hours</p>
              </div>
              <div className="ml-auto">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={scheduleSettings.nightMode} onChange={() => setScheduleSettings(prev => ({...prev, nightMode: !prev.nightMode}))} />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
            
            {scheduleSettings.nightMode && (
              <div className="space-y-3 border-t border-gray-200 pt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nightTimeStart" className="block text-sm font-medium text-gray-700 mb-1">
                      Night Start Time
                    </label>
                    <input
                      type="time"
                      id="nightTimeStart"
                      name="nightTimeStart"
                      value={scheduleSettings.nightTimeStart}
                      onChange={(e) => setScheduleSettings(prev => ({...prev, nightTimeStart: e.target.value}))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="nightTimeEnd" className="block text-sm font-medium text-gray-700 mb-1">
                      Night End Time
                    </label>
                    <input
                      type="time"
                      id="nightTimeEnd"
                      name="nightTimeEnd"
                      value={scheduleSettings.nightTimeEnd}
                      onChange={(e) => setScheduleSettings(prev => ({...prev, nightTimeEnd: e.target.value}))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Light Brightness (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scheduleSettings.nightBrightness}
                    onChange={(e) => setScheduleSettings(prev => ({...prev, nightBrightness: e.target.value}))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Devices Tab
  const renderDevicesTab = () => {
    // Ensure we have a valid devices array
    const safeUserDevices = userDevices || [];
    
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">Manage Devices</h2>
        
        <div className="space-y-4">
          {safeUserDevices.length > 0 ? (
            safeUserDevices.map((device, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded-lg mr-4">
                    {getDeviceIcon(device.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{device.name || "Unnamed Device"}</h3>
                    <p className="text-sm text-gray-500">
                      {device.brand || "Unknown Brand"} • {device.room || "Unassigned"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={ignoredDevices.includes(device.id)}
                        onChange={() => toggleIgnoreDevice(device.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Always ignore energy saving</span>
                    </label>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => handleEditDevice(index)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button 
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => handleDeleteDevice(index)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No devices found</h3>
              <p className="text-gray-500 mb-4">You don't have any devices set up yet.</p>
              <button
                onClick={() => setActiveTab("add-device")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Your First Device
              </button>
            </div>
          )}
        </div>
        
        {isEditingDevice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Edit Device</h3>
              <form onSubmit={handleSaveEditDevice} className="space-y-4">
                <div>
                  <label htmlFor="editName" className="block text-sm font-medium text-gray-700 mb-1">
                    Device Name
                  </label>
                  <input
                    type="text"
                    id="editName"
                    name="name"
                    value={editingDevice.name}
                    onChange={handleEditDeviceChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="editRoom" className="block text-sm font-medium text-gray-700 mb-1">
                    Room
                  </label>
                  <select
                    id="editRoom"
                    name="room"
                    value={editingDevice.room}
                    onChange={handleEditDeviceChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a room</option>
                    {rooms && rooms.length > 0 ? (
                      rooms.map((room) => (
                        <option key={room.id} value={room.name}>
                          {room.name}
                        </option>
                      ))
                    ) : (
                      <option value="Living Room">Living Room</option>
                    )}
                  </select>
                </div>
                
                <div className="flex space-x-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingDevice(false)}
                    className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Add Device Tab
  const renderAddDeviceTab = () => (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add a New Device</h2>
      
      <div className="mb-4">
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex space-x-4">
            <button
              className={`flex-1 py-2 px-4 rounded-lg text-center transition-colors ${
                newDevice.isIoT 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setNewDevice(prev => ({...prev, isIoT: true}))}
            >
              IoT Smart Device
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-lg text-center transition-colors ${
                !newDevice.isIoT 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setNewDevice(prev => ({...prev, isIoT: false}))}
            >
              Non-IoT Device
            </button>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleAddDevice} className="space-y-4">
        <div>
          <label htmlFor="deviceName" className="block text-sm font-medium text-gray-700 mb-1">
            Device Name
          </label>
          <input
            type="text"
            id="deviceName"
            name="name"
            value={newDevice.name}
            onChange={handleNewDeviceChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Living Room TV"
            required
          />
        </div>
        
        <div>
          <label htmlFor="deviceType" className="block text-sm font-medium text-gray-700 mb-1">
            Device Type
          </label>
          <select
            id="deviceType"
            name="type"
            value={newDevice.type}
            onChange={handleNewDeviceChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a device type</option>
            {newDevice.isIoT ? (
              <>
                <option value="lighting">Lighting</option>
                <option value="thermostat">Thermostat</option>
                <option value="security">Security Camera</option>
                <option value="appliance">Smart Appliance</option>
                <option value="entertainment">Entertainment System</option>
                <option value="other">Other Smart Device</option>
              </>
            ) : (
              <>
                <option value="regular-lighting">Regular Light</option>
                <option value="regular-appliance">Regular Appliance</option>
                <option value="heating">Heating Device</option>
                <option value="cooling">Cooling Device</option>
                <option value="regular-entertainment">Entertainment Device</option>
                <option value="other-regular">Other Regular Device</option>
              </>
            )}
          </select>
        </div>
        
        <div>
          <label htmlFor="deviceRoom" className="block text-sm font-medium text-gray-700 mb-1">
            Room
          </label>
          <select
            id="deviceRoom"
            name="room"
            value={newDevice.room}
            onChange={handleNewDeviceChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a room</option>
            {rooms && rooms.length > 0 ? (
              rooms.map((room) => (
                <option key={room.id} value={room.name}>
                  {room.name}
                </option>
              ))
            ) : (
              <option value="Living Room">Living Room</option>
            )}
          </select>
        </div>
        
        {newDevice.isIoT && (
          <>
            <div>
              <label htmlFor="deviceBrand" className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <select
                id="deviceBrand"
                name="brand"
                value={newDevice.brand}
                onChange={handleNewDeviceChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a brand</option>
                <option value="Phillips">Phillips</option>
                <option value="Samsung">Samsung</option>
                <option value="Nest">Nest</option>
                <option value="Ring">Ring</option>
                <option value="Apple">Apple</option>
                <option value="Google">Google</option>
                <option value="Amazon">Amazon</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            
            {newDevice.brand === 'Custom' && (
              <div>
                <label htmlFor="customBrand" className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Brand Name
                </label>
                <input
                  type="text"
                  id="customBrand"
                  name="customBrand"
                  value={newDevice.customBrand}
                  onChange={handleNewDeviceChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter brand name"
                  required
                />
              </div>
            )}
            
            <div>
              <label htmlFor="deviceModel" className="block text-sm font-medium text-gray-700 mb-1">
                Model Number (optional)
              </label>
              <input
                type="text"
                id="deviceModel"
                name="model"
                value={newDevice.model}
                onChange={handleNewDeviceChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. ABC-123"
              />
            </div>
          </>
        )}
        
        {!newDevice.isIoT && (
          <div>
            <label htmlFor="deviceWattage" className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Wattage (W)
            </label>
            <input
              type="number"
              id="deviceWattage"
              name="watts"
              value={newDevice.watts || ""}
              onChange={handleNewDeviceChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 60"
            />
          </div>
        )}
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Add Device
          </button>
        </div>
      </form>
    </div>
  );
  
  // Customer Support Tab
  const renderSupportTab = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Pulse Customer Support</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <FaHeadset className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="font-medium text-blue-800">Need help with your Pulse smart home?</h3>
            <p className="text-sm text-blue-700 mt-1">
              Our Pulse support team is available 24/7 to assist you with any questions or issues. 
              Submit your request below and we'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSupportSubmit} className="space-y-4">
        <div>
          <label htmlFor="supportCategory" className="block text-sm font-medium text-gray-700 mb-1">
            How can we help you?
          </label>
          <select
            id="supportCategory"
            name="category"
            value={supportForm.category}
            onChange={handleSupportFormChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a category</option>
            <option value="technical">Technical Issue</option>
            <option value="billing">Billing Question</option>
            <option value="account">Account Management</option>
            <option value="feature">Feature Request</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="supportDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Please describe your issue
          </label>
          <textarea
            id="supportDescription"
            name="description"
            value={supportForm.description}
            onChange={handleSupportFormChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="supportName" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="supportName"
              name="name"
              value={supportForm.name}
              onChange={handleSupportFormChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              readOnly
            />
          </div>
          
          <div>
            <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="supportEmail"
              name="email"
              value={supportForm.email}
              onChange={handleSupportFormChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              readOnly
            />
          </div>
        </div>
        
        <div className="flex items-start mt-2">
          <div className="flex items-center h-5">
            <input
              id="supportConsent"
              name="consent"
              type="checkbox"
              checked={supportForm.consent}
              onChange={(e) => setSupportForm(prev => ({...prev, consent: e.target.checked}))}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
          </div>
          <div className="ml-3">
            <label htmlFor="supportConsent" className="text-sm text-gray-600">
              I consent to Pulse contacting me regarding this support request via email or phone.
            </label>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Submit Support Request
          </button>
        </div>
      </form>
      
      <div className="mt-6 border-t pt-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium text-gray-800">Contact Information</h3>
          <div className="flex items-center">
            <img 
              src="/assets/images/pulse-logo.png" 
              alt="Pulse Logo" 
              className="h-8 w-auto mr-2"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="text-lg font-semibold text-blue-700">Pulse</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-700">Phone Support</p>
            <p className="text-blue-600 font-bold">1-800-PULSE-HOME</p>
            <p className="text-sm text-gray-600 mt-1">Available Monday-Friday, 9am-8pm EST</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-700">Email Support</p>
            <p className="text-blue-600 font-bold">support@pulse-home.com</p>
            <p className="text-sm text-gray-600 mt-1">We'll respond within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper function to get device icon based on type
  const getDeviceIcon = (type) => {
    if (!type) return (
      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    );
    
    switch (type.toLowerCase()) {
      case 'lighting':
        return (
          <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'thermostat':
        return (
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
        );
      case 'security':
        return (
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'appliance':
        return (
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
          </svg>
        );
      case 'entertainment':
        return (
          <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">Account Settings</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowAccountSettings(false)}
              className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>
        
        <div className="flex border-b">
          <button
            className={`px-4 py-3 font-medium text-sm flex items-center border-b-2 transition-colors ${
              activeTab === "profile" 
                ? "text-blue-500 border-blue-500" 
                : "text-gray-500 border-transparent hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser className="mr-2" /> Profile
          </button>
          
          <button
            className={`px-4 py-3 font-medium text-sm flex items-center border-b-2 transition-colors ${
              activeTab === "schedule" 
                ? "text-blue-500 border-blue-500" 
                : "text-gray-500 border-transparent hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("schedule")}
          >
            <FaClock className="mr-2" /> Schedule
          </button>
          
          <button
            className={`px-4 py-3 font-medium text-sm flex items-center border-b-2 transition-colors ${
              activeTab === "devices" 
                ? "text-blue-500 border-blue-500" 
                : "text-gray-500 border-transparent hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("devices")}
          >
            <FaPlug className="mr-2" /> Devices
          </button>
          
          <button
            className={`px-4 py-3 font-medium text-sm flex items-center border-b-2 transition-colors ${
              activeTab === "add-device" 
                ? "text-blue-500 border-blue-500" 
                : "text-gray-500 border-transparent hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("add-device")}
          >
            <FaPlusCircle className="mr-2" /> Add Device
          </button>
          
          <button
            className={`px-4 py-3 font-medium text-sm flex items-center border-b-2 transition-colors ${
              activeTab === "support" 
                ? "text-blue-500 border-blue-500" 
                : "text-gray-500 border-transparent hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("support")}
          >
            <FaHeadset className="mr-2" /> Pulse Support
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "profile" && renderProfileTab()}
          {activeTab === "schedule" && renderScheduleTab()}
          {activeTab === "devices" && renderDevicesTab()}
          {activeTab === "add-device" && renderAddDeviceTab()}
          {activeTab === "support" && renderSupportTab()}
        </div>
        
        <div className="p-4 border-t flex justify-between">
          <button
            onClick={() => setShowAccountSettings(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
