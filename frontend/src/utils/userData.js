const userData = {
  name: "Albert",
  weather: {
    temperature: 19,
    condition: "Rainy",
  },
  humidity: 65,
  totalConsumption: 160,
  lighting: {
    intensity: 80,
  },
  thermostat: {
    temperature: 75,
  },
  rooms: [
    { name: "Living Room", icon: "Living Room" },
    { name: "Bedroom", icon: "Bedroom" },
    { name: "Kitchen", icon: "Kitchen" },
    { name: "Dining Room", icon: "Dining Room" },
    { name: "Play Room", icon: "Play Room" }
  ],
  devices: [
    { id: 1, name: "Smart Light", status: "On", room: "Living Room", watts: 10, cost: 0.12, image: "/assets/images/lightbulb.png" },
    { id: 2, name: "Air Conditioner", status: "Off", room: "Bedroom", watts: 1500, cost: 0.20, image: "/assets/images/noniot.png" },
    { id: 3, name: "Door Lock", status: "Locked", room: "Front Door", watts: 5, cost: 0.05, image: "/assets/images/noniot.png" },
    { id: 4, name: "Cleaning Vacuum", status: "Off", room: "Kitchen", watts: 200, cost: 0.15, image: "/assets/images/noniot.png" },
  ],
  account: {
    firstName: "Albert",
    lastName: "Smith",
    emails: ["albert@example.com"],
    phoneNumbers: ["+123456789"],
    address: "123 Smart Home Street",
    workHours: [],
    alerts: {
      highEnergyUsage: true,
      powerOutage: false,
      monthlyCost: true,
      monthlySavings: true,
    },
  }
};

export default userData;
